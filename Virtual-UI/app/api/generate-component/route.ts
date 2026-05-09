import { generateComponent } from "@/controller/generateAIComponent.controller";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req : NextRequest) => {    
    const {prompt} = await req.json();
    try {
        const result = await generateComponent(prompt);
        console.log("result from gen controller: ", result);
        
        return NextResponse.json({ success: true, message: "Component generated successfully", parsed: result }, { status: 200 });
    } catch (error) {
        console.log("Error generating component:", error);
        return NextResponse.json({ success: false, message: "Failed to generate component" }, { status: 500 });
    }
    
}
