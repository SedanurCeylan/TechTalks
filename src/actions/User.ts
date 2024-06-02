'use server'
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";


export const getCurrentUserId = () => {
    const {userId} = auth()
    return userId
}

export const getCurrentuser = async () => {
    const {userId} = auth()
    if(!userId) throw new Error ('No current user found')
    const User = await clerkClient.users.getUser(userId)
    return JSON.parse(JSON.stringify(User))
}

export const getuser = async (userId:string) => {
    if(!userId) throw new Error ('No current user found')
    const User = await clerkClient.users.getUser(userId)
    return JSON.parse(JSON.stringify(User))
}