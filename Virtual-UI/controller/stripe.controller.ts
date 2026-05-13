import connectDb from "@/lib/connectDB"
import stripe from "@/lib/stripe";

const CREDIT_MAP = {
    99: 200,
} as Record<number, number>;

const stripeHandler = async ({ userId, amount }: { userId: string, amount: number }) => {

    try {
        await connectDb();

        const credits = CREDIT_MAP[amount];

        if (!credits) {
            throw new Error("Invalid pricing amount");
        }

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
                            name: `${credits} Credits `
                        },
                        unit_amount: amount * 100

                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId,
                credits
            }
        })

        if (!session.url) {
            throw new Error("Stripe session URL was empty");
        }

        return { url: session.url };
    } catch (error: any) {
        console.log("Error in stripeHandler:", error.message);
        throw error;
    }
}

export default stripeHandler;