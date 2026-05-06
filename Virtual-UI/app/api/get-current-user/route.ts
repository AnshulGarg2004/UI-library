import getCurrentUser from "@/controller/getCurrentUser.controller"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        return await getCurrentUser();
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error fetching current user" }, { status: 500 });
    }
}