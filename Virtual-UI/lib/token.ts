import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
export const genToken = (userId : string) : string => {
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET!, {expiresIn : '7d'});
        return token;
    } catch (error : any) {
        console.log("Error occured in token: ", error.message);
        return error.message;
    }
}