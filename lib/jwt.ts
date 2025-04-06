// lib/jwt.ts
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret';

export const signJWT = async ({ userid, email = "", name = "" }: { userid: string, email?: string, name?: string }) => {
  try {
    // Convert string secret to Uint8Array as required by jose
    const secret = new TextEncoder().encode(JWT_SECRET);
    
    // Create and sign the JWT with more information
    const token = await new SignJWT({ 
      userid,
      email,
      name,
      // You can add more non-sensitive data here if needed
      iat: Math.floor(Date.now() / 1000),
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);
    
    return token;
  } catch (error) {
    console.error("Error signing JWT:", error);
    throw new Error("Error signing JWT");
  }
};

export const verifyJWT = async (token: string) => {
  try {
    // Convert string secret to Uint8Array as required by jose
    const secret = new TextEncoder().encode(JWT_SECRET);
    
    // Verify the JWT
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return null;
  }
};