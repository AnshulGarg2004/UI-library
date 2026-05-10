import Components from "@/models/component.model";
import User from "@/models/user.model"
import { NextResponse } from "next/server";

export const getAllUsers = async () => {
    try {
        const users = await User.find().sort({createdAt : -1});
        
        if(!users) {
            return NextResponse.json({success : false, message : "Failed to fetch users"}, {status : 401});
        }

        return NextResponse.json({success : true, message : "Users fetched successfully", users: users} , {status : 200});
    } catch (error : any) {
        return NextResponse.json({success : false, message : `Error in fetching users: ${error.message}`}, {status : 500});
    }
}


export const getAllComponents = async () => {
    try {
        const components = await Components.find().populate("owner").sort({createdAt: -1});

        if(!components) {
            return NextResponse.json({success : false, message : "failed to fetch components"}, {status : 401});
        }

        return NextResponse.json({ success: true, message: "Components fetched successfully", components: components }, { status: 200 })
    } catch (error: any) {
        console.log("Error in get component controler: ", error.message);
        
        return NextResponse.json({ success: false, message: `Error in fetching components: ${error.message}` }, { status: 500 });
    }
}