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

        return NextResponse.json({ success: true, message: "Stripe session created successfully", url : result.url }, { status: 200 });
        
    } catch (error: any) {
        console.log("Error in stripe: ", error.message);
        return NextResponse.json({ success: false, message: "Error in creating stripe session" }, { status: 500 });

    }
}