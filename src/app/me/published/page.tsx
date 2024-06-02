import { getuser } from '@/actions/User'
import { User } from '@clerk/nextjs/server'
import { time } from 'console'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { getDraftStory, getPublishedStory, getSavedStory } from '@/actions/me';
import StoryPage from '../StoryPage';

type Props={

}

const page =  async (props: Props) => {
    const drafts = await getDraftStory()
    const published = await getPublishedStory ()
    const saved = await getSavedStory()
  
    return(
        <div>
            <StoryPage stories={published.response} TotalDrafts={drafts.response.length}
            TotalPublished={published.response.length} TotalSaved={saved.response.length}/>
        </div>
        
    )
}

export default page