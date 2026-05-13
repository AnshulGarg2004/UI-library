import connectDb from "@/lib/connectDB"
import stripe from "@/lib/stripe";
import { NextResponse } from "next/server";

const CREDIT_MAP = {
    200: 99,
} as Record<number, number>;

const stripeHandler = async ({ userId, amount }: { userId: string, amount: number }) => {

    try {
        await connectDb();

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancelled`,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `${CREDIT_MAP[amount]} Credits `
                        },
                        unit_amount: amount * 100

                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId,
                credits: CREDIT_MAP[amount]
            }
        })

        return NextResponse.json({ success: true, message: "Stripe session created successfully", url: session.url }, { status: 200 });
    } catch (error: any) {
        console.log("Error in stripeHandler:", error.message);
        return NextResponse.json({ success: false, message: "Error in creating stripe session" }, { status: 500 });
    }
}

export default stripeHandler;