import { saveComponent } from "@/controller/saveComponent";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req : NextRequest) => {
    try {
        const {name, code, props} = await req.json();
        const resp = await saveComponent({ name, code, props });

        console.log("response from save cmponent controller: ", resp);

        return NextResponse.json({ success: true, message: "Component saved successfully", resp }, { status: 200 });
        
    } catch (error) {
        console.log("Error saving component:", error);
        return NextResponse.json({ success: false, message: "Failed to save component" }, { status: 500 });
    }
}