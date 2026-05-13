import jwt from 'jsonwebtoken';
export const genToken = (userId : string) : string => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET is not configured');
    }

    return jwt.sign({ userId }, secret, { expiresIn: '7d' });
}