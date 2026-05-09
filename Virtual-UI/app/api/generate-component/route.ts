import { generateComponent } from "@/controller/generateAIComponent.controller";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req : NextRequest) => {    
    const {prompt} = await req.json();
    try {
        const result = await generateComponent(prompt);
        const resultData = await result.json();
        console.log("result from gen controller: ", resultData);
        
        return NextResponse.json({ success: true, message: "Component generated successfully", parsed: resultData.parsed, remainingCredits: resultData.remainingCredits }, { status: 200 });
    } catch (error) {
        console.log("Error generating component:", error);
        return NextResponse.json({ success: false, message: "Failed to generate component" }, { status: 500 });
    }
    
}
