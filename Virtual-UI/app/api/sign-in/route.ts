import { googleAuth } from "@/controller/auth.controller";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
    const {name, email} = await request.json();

    try {
        const auth = await googleAuth({name, email});
        return auth;
    } catch (error: any) {
        console.error("Error occurred in sign-in: ", error.message);
        return NextResponse.json({ success: false, message: "Error occurred while signing in" }, { status: 500 });
    }

}