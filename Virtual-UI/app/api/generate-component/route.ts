import { generateComponent } from "@/controller/generateAIComponent.controller";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req : NextRequest) => {    
    const {prompt} = await req.json();
    try {
        // The controller returns a NextResponse already (with parsed payload).
        // Return it directly so the response body is the controller's JSON.
        return await generateComponent(prompt);
    } catch (error) {
        console.log("Error generating component:", error);
        return NextResponse.json({ success: false, message: "Failed to generate component" }, { status: 500 });
    }
    
}
