import { NextRequest, NextResponse } from "next/server";
import verifyToken from "./lib/verifyToken";


const proxy = async (req: NextRequest) => {
    const token = req.cookies.get("token")?.value;

    if(!token) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    // await verifyToken(token.toString());

    return NextResponse.next();
}

export default proxy;