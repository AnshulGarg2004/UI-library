import { saveComponent } from "@/controller/saveComponent";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req : NextRequest) => {
    try {
        const {name, code_jsx, code_tsx, props} = await req.json();
        const resp = await saveComponent({ name, code_jsx, code_tsx, props });
        const responseData = await resp.json();
        console.log("response from save component controller: ", responseData);

        return NextResponse.json({ success: true, message: "Component saved successfully", responseData }, { status: 200 });
        
    } catch (error) {
        console.log("Error saving component:", error);
        return NextResponse.json({ success: false, message: "Failed to save component" }, { status: 500 });
    }
}