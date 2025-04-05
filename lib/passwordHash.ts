import crypto from "crypto";

export const hashPassword = async (password: string, salt: string) => {

    return new Promise((resolve, reject) => {
        crypto.scrypt(password.normalize(), salt, 64, (err, derivedKey) => {
            if (err) {
                reject(err);
            }
            resolve(derivedKey.toString("hex").normalize());
        });
    })
};

export const generateSalt = () => crypto.randomBytes(16).toString("hex");