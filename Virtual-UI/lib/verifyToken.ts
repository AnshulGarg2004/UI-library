import jwt from 'jsonwebtoken';
const verifyToken = async (token : string) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if(!decoded) {
        console.log("decoded not geting");
        
    }
    return decoded;

}


export default verifyToken;