import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/app/prismadb";

export async function POST(request: NextRequest) {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
        throw new Error('Hiçbir kullanıcı oturum açmamış');
    }

    try {
        const newStory = await prisma.story.create({
            data: {
                authorId: userId
            }
        });
        return NextResponse.json(newStory);

    } catch (error) {
        return NextResponse.error();
    }
}

