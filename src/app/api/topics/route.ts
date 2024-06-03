import prisma from "@/app/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { userId }: { userId: string | null } = auth();
    if (!userId) {
      return NextResponse.json("User not present");
    }

    try {
        const {tag} = await request.json()

        const Topic= await prisma.topics.findFirst({
          where:{
            userId
          }
        })
        if(!Topic){
          const CreateTopic = await prisma.topics.create({
            data:{
              userId,
              selectedTopics:tag

            }
          })
          return NextResponse.json('Added tags seccessfully')
          
        }
        const updateTopic = await prisma.topics.update({
          where:{
            id:Topic.id
          },
          data:{
            selectedTopics:tag
          }
        })
        return NextResponse.json('Added tags seccessfully')
    } catch (error) {
      
      console.log('Error while adding topics/tags')
      return NextResponse.error()
        
    }

}