import { logout } from "@/controller/auth.controller";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const Logout = await logout();
        return Logout;
    } catch (error : any) {
        console.log("Error in logging out: ", error.message);
        return NextResponse.json({ success: false, message: "Error occurred while logging out" }, { status: 500 });
        
    }
}