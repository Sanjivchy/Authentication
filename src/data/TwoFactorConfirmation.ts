import { db }   from "@/lib/db";
import exp from "constants";

export const getTwoFactoConfirmationByUserID = async (userId:string) => {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where: {
                userId
            }
        })
        return twoFactorConfirmation
    } catch (error) {
        return null
    }
}
