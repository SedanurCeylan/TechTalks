import prisma from "@/app/prismadb"
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const {userId} = auth()
    if(!userId) throw new Error ('No user found')

    try {
        const body = await request.json()
        const {storyId, Content} = body

        if (!storyId || !Content) {
            throw new Error('Insuficient data')
        }

        const existingStory = await prisma.story.findUnique({
            where:{
                id:storyId
            }
        })
        if (!existingStory) {
            throw new Error('No Stories were found to comment')
        }

        const newComment = await prisma.comment.create({
            data:{
                userId,
                storyId,
                content:Content
            }
        })

        return NextResponse.json('Succesfully commented story on story')

    } catch (error) {
        console.log("Error in commenting", error)
        return NextResponse.error()
    }
}