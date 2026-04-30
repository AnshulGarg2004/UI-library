import connectDb from "@/lib/connectDB"
import { genToken } from "@/lib/token";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const googleAuth = async ({ name, email }: { name: string, email: string }) => {
    try {
        await connectDb();

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ name, email });
        }

        let token = await genToken(user._id.toString());

        const response = NextResponse.json({ success: true, user, message: "User authenticated successfully" }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 7 * 1000,
        });

        return response;


    } catch (error: any) {
        console.log("Error occurred in googleAuth: ", error.message);
        return NextResponse.json({ success: false, message: "Error occurred while authenticating with Google" }, { status: 500 });
    }
}


export const logout = async () => {
    try {
        const response = NextResponse.json(
            { success: true, message: "Logged out successfully" },
            { status: 200 }
        );

        // ✅ delete cookie
        response.cookies.delete("token");

        return response;
    } catch (error: any) {
        console.log("Error occurred in logout: ", error.message);
        return NextResponse.json({ success: false, message: "Error occurred while logging out" }, { status: 500 });
    }
}