
import connectDb from "@/lib/connectDB";
import stripe from "@/lib/stripe";
import User from "@/models/user.model";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const sign = req.headers.get("stripe-signature");
    const payload = await req.text();
    await connectDb();
    let event;

    if (!sign) {
        return NextResponse.json({ success: false, message: "Sign is required" }, { status: 500 });
    }
    try {

        const secret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!secret) {
            console.error('STRIPE_WEBHOOK_SECRET is not set');
            return NextResponse.json({ success: false, message: 'Webhook secret not configured' }, { status: 500 });
        }

        event = stripe.webhooks.constructEvent(payload, sign, secret);
    } catch (error) {
        console.log("Error in webhook: ", error);
        return NextResponse.json({ success: false, message: "Error in webhook" }, { status: 500 });
    }
    if (event.type === 'checkout.session.completed') {


        const session = event.data.object;
        const userId = session?.metadata?.userId;
        const credits = Number(session?.metadata?.credits);
        const plan = session?.metadata?.plan;

        if (!userId || Number.isNaN(credits)) {
            console.warn('Invalid webhook metadata', { userId, credits: session?.metadata });
            return NextResponse.json({ success: false, message: "Invalid webhook metadata" }, { status: 400 });
        }

        const updated = await User.findByIdAndUpdate(userId, { $inc: { aiCredits: credits } }, { new: true });

        if (!updated) {
            console.warn('Webhook: user not found', userId);
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }
        console.log('Webhook: credits updated for user', userId, 'newCredits:', updated.credits);

    }

    return NextResponse.json({ success: true, received: true, message: "Webhook processed" }, { status: 200 });
}

// Respond to GET so test pings or accidental GETs don't return 405
export const GET = async () => {
    return NextResponse.json({ success: true, message: 'Webhook endpoint is live' }, { status: 200 });
}