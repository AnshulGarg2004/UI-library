import jwt from 'jsonwebtoken';
const verifyToken = async (token : string) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET is not configured');
    }

    const decoded = jwt.verify(token, secret);

    if(!decoded) {
        console.log("decoded not geting");
        
    }
    return decoded;

}


export default verifyToken;