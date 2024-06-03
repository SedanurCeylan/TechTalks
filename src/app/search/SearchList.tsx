'use client'
import { getStoryByTag } from "@/actions/getStories";
import Navbar from "@/components/Navbar";
import StoryItem from "@/components/StoryItem";
import { Story } from "@prisma/client";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {}

const SearchList = (props:Props)=>{
    const [filteredStories, setFilteredStories]= useState<Story[]>([])
    const searchparams = useSearchParams()
    const searchValue = searchparams.get('for')
    
    useEffect(()=>{
        const fetchStory = async () =>{
            try {
                const response = await getStoryByTag(searchValue || 'All')
                setFilteredStories(response.stories)
            } catch (error) {
                console.log("Error in fetching teh data ")
            }
        }
        fetchStory()
    },[searchparams])
    
    return(
        <div>
            {filteredStories.map((story)=>(
                <StoryItem key={story.id} story={story}/>
            ))}
        </div>
    )
}

export default SearchList