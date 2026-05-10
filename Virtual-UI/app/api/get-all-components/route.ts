import { getAllComponents } from "@/controller/getAll";
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const result = await getAllComponents();
        console.log("resp of get all c contr: ", result);
        
        const data = await result.json();
        console.log("result from get all components controller: ", data);

        return NextResponse.json({success : true, message : "Components fetched successfully", components: data.components })
    } catch (error) {
        return NextResponse.json({ success: false, message: `Failed to fetch components : ${error}` }, { status: 500 });
    }
}