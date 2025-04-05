
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret';

export const signJWT = ({ userid, salt }: { userid: string, salt: string }) => {
    // Sign the JWT
    try {
        const token = jwt.sign({ userid }, salt, { expiresIn: '2d' });
        return token;
    } catch (error) {
        throw new Error("Error signing JWT");
    }
};

export const verifyJWT = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
};
