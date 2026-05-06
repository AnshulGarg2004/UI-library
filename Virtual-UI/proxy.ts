import { NextRequest, NextResponse } from "next/server";
import verifyToken from "./lib/verifyToken";


const proxy = async (req: NextRequest) => {
    const token = req.cookies.get("token")?.value;

    return NextResponse.next();
}

export default proxy;