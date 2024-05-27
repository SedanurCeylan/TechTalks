"use server"
import prisma from "@/app/prismadb"

export const getStoryById = async (storyId:string) => {
    if(!storyId){
        throw new Error('Do not have storyId')
    }

    try {
        const StoryById = await prisma.story.findUnique({
            where:{
                id:storyId
            }
        })
        return {response : StoryById}


    }catch(error){
        return {error:'Error on getting the story by Id'}

    }
}

export const getPublishedStoryById = async (storyId:string) => {
    if(!storyId){
        throw new Error('Do not have storyId')
    }

    try {
        const StoryById = await prisma.story.findUnique({
            where:{
                id:storyId,
                publish:true
            }
        })
        return {response : StoryById}


    }catch(error){
        return {error:'Error on getting the story by Id'}

    }
}