"use server"
import prisma from "@/app/prismadb"

export const getStoryById = async (storyId:string) => {
    if(!storyId){
        throw new Error('Do not have storyId')
    }

    try {
        const StoryById = await prisma.story.findUnique({
            where:{
                id:storyId,
                publish:false
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
export const getStoriesByAuthor = async (storyId:string, authorId:string)=> {
    try {
        const AuthorStories = await prisma.story.findMany({
            where:{
                authorId,
                NOT:{
                    id:storyId
                },
                publish:true
            }
        })
        return{response:AuthorStories}
        
    } catch (error) {
        return {error:"Error on getting stories by author"}
        
    }
}