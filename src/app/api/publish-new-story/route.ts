import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/prismadb";

export async function PATCH(request:NextRequest) {
    const {storyId, topics} = await request.json()

    if(!storyId){
        throw new Error ('No storyId was found')
    }

    const story = await prisma.story.findUnique({
        where:{
            id:storyId
        }
    })

    if(!story){
        throw new Error('No Story were found')
    }

    try {
        const updateStory = await prisma.story.update({
            where:{
                id:story.id
            },
            data:{
                publish:true,
                topics:topics
            }
        })
        return NextResponse.json(updateStory)

    }catch(error) {
        console.log(error)
        return NextResponse.error()
    }
    
}