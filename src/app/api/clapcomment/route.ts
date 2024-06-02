import prisma from "@/app/prismadb"
import { auth } from "@clerk/nextjs/server";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    const {userId} = auth()
    if(!userId) throw new Error ('No user found')
    
    try {
        const {storyId, commentId} = await request.json()

        const storyExist = await prisma.story.findUnique({
            where:{
                id:storyId
            }
        })

        if(!storyExist){
            throw new Error ('No Stories were found to clap')

        }

        const clapped = await prisma.clap.findFirst({
            where:{
                storyId,
                userId,
                commentId,
                clapCount:1
            }
        })

        if(clapped && clapped.clapCount <50){
            await prisma.clap.update ({
                where:{
                    id:clapped.id
                },
                data:{
                    clapCount:clapped.clapCount + 1
                }
            })

            return NextResponse.json('Clap update!')
        }
        else{
            const clapStory = await prisma.clap.create({
                data:{
                    userId,
                    storyId:storyExist.id,
                    clapCount:1
                }
            })
            return NextResponse.json('Clap created')
        }


    }catch(error) {
        console.log("Error clapping the story ",error)
        return NextResponse.error()

    }
    
} 