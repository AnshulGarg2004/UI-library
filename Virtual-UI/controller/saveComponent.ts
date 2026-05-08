import connectDb from "@/lib/connectDB";
import Components, { Icomponent } from "@/models/component.model";
import getCurrentUser from "./getCurrentUser.controller";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

export const saveComponent = async ({ name, code, props }: Icomponent) => {
    try {
        await connectDb();

        const currentResponse = await getCurrentUser();
        const currentData = await currentResponse.json();
        const user = await currentData.user;
        
        if(!user) {
            return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 });
        }

        if(user.role === "admin") {
            const existing = await Components.findOne({name, visibility : "public"});

            if(existing) {
                return NextResponse.json({success : false, message : "Admin cannot create duplicate component"}, {status : 402});
            }
        }

        if(user.role !== "admin") {
            const existing = await Components.findOne({name, owner : user._id});

            if(existing) {
                return NextResponse.json({success : false, message: "Component with this name already exists"}, {status : 402});
            }
        }

        const component = await Components.create({
            name,
            code,
            props,
            owner : user._id,
        });

        return NextResponse.json({success : true, message : "Component saved successfully", component}, {status : 200});
    } catch (error) {
        console.log("error in saving component: ", error);
        return NextResponse.json({success : false, message : "Error occurred while saving component"}, {status : 500});
    }
}


export const publishComponent = async (componentId : string) => {
    try {
        await connectDb();

        const currentresp = await getCurrentUser();
        const currentData = await currentresp.json();
        const user = await currentData.user;

        if(user.role !== "admin") {
            return NextResponse.json({success : false, message : "Only admin can publish component"}, {status : 401});
        }

        const component = await Components.findById(componentId);

        if(!component) {
            return NextResponse.json({success : false, message : "Component not found"}, {status : 404});
        }

        if(component.owner.toString() !== user._id.toString()) {
            return NextResponse.json({success : false, message : "User not authorized to publish this component"}, {status : 403});
        }


        const libPath = path.join(process.cwd(), "../Virtual-UI-lib");

        const componentDir = path.join(libPath, "src/components", component.name);
        const componentFileJsx = path.join(componentDir, `${component.name}.jsx`);
        const ComponentFileTsx = path.join(componentDir, `${component.name}.tsx`);




        const indexFile = path.join(componentDir, "src/index.js");

        if(fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, {recursive : true});
        }

        fs.writeFileSync(componentFileJsx, component.code_jsx);
        fs.writeFileSync(ComponentFileTsx, component.code_tsx);

        const indexContent = fs.readFileSync(indexFile, "utf-8");

        const exportLine = `export { ${component.name} } from  "./components/${component.name}/${component.name}"`;

        if(!indexContent.includes(exportLine)) {
            fs.appendFileSync(indexFile, `\n${exportLine}`);
        }

        console.log("Cleaning old build...");

        const distPath = path.join(libPath, "dist");

        if(!fs.existsSync(distPath)) {
            fs.rmSync(distPath, {recursive : true, force : true});
        }

        console.log("Building logs...");
        
        execSync("npm run build", {
            cwd  : libPath,
            stdio : "inherit",
        });

        console.log("Updating version...");
        

        execSync("npm version patch --no-git-tag-version", {
            cwd : libPath,
            stdio : "inherit",
        });

        console.log("Publishing to npm...");
        
        execSync("npm publish --access public", {
            cwd : libPath,
            stdio : "inherit",
        });

        component.visibility = "public";
        component.npmPackage = "virtual-ui-lib";

        await component.save();

        return NextResponse.json({success : true, message : "Component published successfully"}, {status : 200});
        
    } catch (error) {
        console.log("Error in publishing to npm: ", error);
        return NextResponse.json({success : false, message : "Error occurred while publishing component"}, {status : 500});
    }
}