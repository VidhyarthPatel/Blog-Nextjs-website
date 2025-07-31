import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function getCurrentUser() {
    const session = await getServerSession(authOptions)
    return session?.user
}

export async function requireAdmin() {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
        throw new Error("Admin access required");
    }
    return user;
}

export async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("Authentication required");
    }
    return user;
}