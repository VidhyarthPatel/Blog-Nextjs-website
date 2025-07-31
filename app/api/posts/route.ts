import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/utlis/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try{
        const posts = await prisma.post.findMany({
            where: { published: true},
            include: {
                author: {
                    select: { name:true, image: true },
                },
                _count: {
                    select: { likes: true, comments: true }
                }
            },
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(posts);
    }catch(error) {
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const user = await requireAdmin();
    console.log(user);
    
    try{    
        const { title, content, Published } = await request.json();

        const post = await prisma.post.create({
            data: {
                title,
                content,
                published: Published || false,
                authorId: user.id
            },
            include: {
                author: {
                    select: { name: true, image: true }
                },
            },
        })

        return NextResponse.json(post);
    }catch(error){
        return NextResponse.json( { error: "Failed to create post" }, { status: 500 });
    }
}