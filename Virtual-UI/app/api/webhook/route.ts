import connectDb from "@/lib/connectDB";
import stripe from "@/lib/stripe";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const sign = req.headers.get("stripe-signature");

    if (!sign) {
        return NextResponse.json(
            { success: false, message: "Stripe signature is required" },
            { status: 400 }  // 400, not 500 — this is a client/caller error
        );
    }

    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) {
        console.error("STRIPE_WEBHOOK_SECRET is not set");
        return NextResponse.json(
            { success: false, message: "Webhook secret not configured" },
            { status: 500 }
        );
    }

    // ✅ Read raw payload BEFORE anything else (critical for signature verification)
    const payload = await req.text();

    let event: ReturnType<typeof stripe.webhooks.constructEvent>;

    try {
        event = stripe.webhooks.constructEvent(payload, sign, secret);
    } catch (error) {
        console.error("Stripe webhook signature verification failed:", error);
        return NextResponse.json(
            { success: false, message: "Invalid webhook signature" },
            { status: 400 }  // 400, not 500 — bad signature is a client error
        );
    }

    try {
        await connectDb();

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            const userId = session?.metadata?.userId;
            const credits = Number(session?.metadata?.credits);
            const plan = session?.metadata?.plan;   // store or use as needed

            if (!userId || !credits || Number.isNaN(credits) || credits <= 0) {
                console.warn("Webhook: invalid metadata", { userId, credits, plan });
                return NextResponse.json(
                    { success: false, message: "Invalid webhook metadata" },
                    { status: 400 }
                );
            }

            // ✅ Use session.id for idempotency — prevents double-crediting on retries
            const alreadyProcessed = await User.findOne({
                _id: userId,
                processedSessions: session.id,
            });

            if (alreadyProcessed) {
                console.log("Webhook: session already processed", session.id);
                return NextResponse.json(
                    { success: true, received: true, message: "Already processed" },
                    { status: 200 }
                );
            }

            const updated = await User.findByIdAndUpdate(
                userId,
                {
                    $inc: { aiCredits: credits },
                    $push: { processedSessions: session.id }, // track processed sessions
                    ...(plan && { $set: { plan } }),           // optionally update plan
                },
                { new: true }
            );

            if (!updated) {
                console.warn("Webhook: user not found", userId);
                return NextResponse.json(
                    { success: false, message: "User not found" },
                    { status: 404 }
                );
            }

            // ✅ Fixed: was logging `updated.credits` but field is `aiCredits`
            console.log(
                "Webhook: credits updated for user",
                userId,
                "| newAiCredits:",
                updated.aiCredits,
                "| plan:",
                plan
            );
        }

        return NextResponse.json(
            { success: true, received: true, message: "Webhook processed" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Webhook handler error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
};

// Respond to GET so accidental GETs don't return 405
export const GET = async () => {
    return NextResponse.json(
        { success: true, message: "Webhook endpoint is live" },
        { status: 200 }
    );
};