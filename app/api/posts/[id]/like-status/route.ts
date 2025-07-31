import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/utlis/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET( request: NextRequest, { params }: { params: Promise<{ id: string }> }){
    try{
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ liked: false });
        }
        const { id } = await params;
        const existingLike = await prisma.like.findUnique({
            where: {
                postId_userId: {
                    postId: id,
                    userId: user.id
                }
            }
        })

        return NextResponse.json({ liked: !!existingLike });
    }catch(error){
        return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
    }
}
