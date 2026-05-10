import { publishComponent } from "@/controller/saveComponent";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req : NextRequest) => {
    try {
        const {componentId} = await req.json();
        const result = await publishComponent(componentId);
        const resultData = await result.json();
        console.log("result from publish component controller: ", resultData);

        return NextResponse.json(resultData, { status: result.status });
    } catch (error) {
        console.log("Error in publish compoennt ccontroller: ", error);
        return NextResponse.json({ success: false, message: "Failed to publish component" }, { status: 500 });
    }
} 