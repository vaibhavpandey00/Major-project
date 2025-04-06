import crypto from "crypto";

const KEY_LENGTH = 64; // in bytes

// Hash password
export const hashPassword = async (password: string, salt: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password.normalize(), salt, KEY_LENGTH, (err, derivedKey) => {
            if (err) return reject(err);
            resolve(derivedKey.toString("hex").normalize());
        });
    });
};

// Compare password by rehashing and checking equality
export const verifyPassword = async (inputPassword: string, salt: string, storedHash: string): Promise<boolean> => {
    const inputHash = await hashPassword(inputPassword, salt);
    return crypto.timingSafeEqual(Buffer.from(inputHash, 'hex'), Buffer.from(storedHash, 'hex'));
};


export const generateSalt = () => crypto.randomBytes(16).toString("hex");