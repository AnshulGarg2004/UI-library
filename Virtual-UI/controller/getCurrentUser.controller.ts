import verifyToken from "@/lib/verifyToken";
import connectDb from "@/lib/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const getCurrentUser = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
       
        
        if(!token) {
            return NextResponse.json({ success: false, message: "No token found" }, { status: 401 });
        }
        
        const decoded = await verifyToken(token.toString());

        
        const userId = (decoded as { userId?: string })?.userId;
        

        if (!userId) {
            return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
        }
        
        await connectDb();
        
        const user = await User.findById(userId);
    
        
        if (!user) {
            
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, user : user, message : "Current user fetched successfully" }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ success: false, message: "Invalid token in catch" }, { status: 401 });
    }
}

export default getCurrentUser;