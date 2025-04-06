import { getAuthCookie } from "./action";
import { verifyJWT } from "./jwt";


export const isAuthenticated = async () => {
    try {
        const token = await getAuthCookie();
        console.log("token", token);
        
        const isTokenValid = verifyJWT(token as string);
        console.log("isTokenValid", isTokenValid);
        return isTokenValid;
    } catch (error) {
        console.log("Error checking authentication:", error.message);
        return false;
    }
}