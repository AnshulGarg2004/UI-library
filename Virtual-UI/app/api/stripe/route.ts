import stripeHandler from "@/controller/stripe.controller";
import { NextRequest, NextResponse } from "next/server";



export const POST = async (req: NextRequest) => {
    try {
        const {userId, amount} = await req.json();

        console.log("user id: ", userId);
        console.log("amt: ", amount);
        
        

        if(!userId || !amount) {
            return NextResponse.json({ success: false, message: "Missing userId or amount" }, { status: 400 });
        }

        const result = await stripeHandler({userId, amount});
        console.log("response from stirpe controller: ", result);

        if (!result?.url) {
            return NextResponse.json({ success: false, message: "Stripe URL not generated" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Stripe session created successfully", url : result.url }, { status: 200 });
        
    } catch (error: any) {
        console.log("Error in stripe: ", error.message);
        if (error?.message === "Invalid pricing amount") {
            return NextResponse.json({ success: false, message: "Invalid amount selected" }, { status: 400 });
        }

        return NextResponse.json({ success: false, message: error?.message || "Error in creating stripe session" }, { status: 500 });

    }
}