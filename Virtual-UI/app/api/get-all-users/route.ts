import { getAllUsers } from "@/controller/getAll";
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const result = await getAllUsers();
        console.log("res of get all use c: ", result);
        
        const users = await result.json();
        console.log("result from get all users controller: ", users.users);

        return NextResponse.json({success : true, message : "Users fetched successfully", data : users})
    } catch (error) {
        return NextResponse.json({ success: false, message: `Failed to fetch users : ${error}` }, { status: 500 });
    }
}