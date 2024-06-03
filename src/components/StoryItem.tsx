import { getuser } from '@/actions/User'
import { User } from '@clerk/nextjs/server'
import { time } from 'console'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Story } from '@prisma/client';
import Link from 'next/link';
import { AuthorDetail } from '@/app/me/StoryPage';
import ClapComponent from '@/app/published/ClapComponent';
import SaveComponent from '@/app/published/SaveComponent';
import { CheckSaved } from '@/actions/Save';
import { ClapCount, ClapCountByUser } from '@/actions/Clap';

type Props={
    key:string,
    story:Story
 
}

const StoryItem = ({key,story}: Props) => {
    const [userClaps, setUserClaps] = useState<number>(0)
    const [totalClaps, setTotalClaps] = useState<number>(0)
    const [SavedStatus, setSavedStatus] = useState<boolean>(false)

    useEffect(() => {
        const fetchClapCountByUser = async () => {
            try {
                const claps = await ClapCountByUser(story.id)
                setUserClaps(claps)
            } catch (error) {
                console.log("Error fetching the user claps")
            }
        }

        const fetchTotalClaps = async () => {
            try {
                const claps = await ClapCount(story.id)
                if (claps !== undefined) {
                    setTotalClaps(claps);
                }
            } catch (error) {
                console.log("Error fetching the claps")
            }
        }
        const fetchSavedStatus = async () => {
            try {
                const Savedstatus = await CheckSaved(story.id)
                if (Savedstatus.Status)
                    setSavedStatus(Savedstatus.Status)

            } catch (error) {
                console.log("error")

            }

        }
        fetchSavedStatus()
        fetchTotalClaps()
        fetchClapCountByUser()
        
    }, [story.id])
    const stripHtmlTags = (htmlString: string) => {
        return htmlString.replace(/<[^>]*>/g, '');
    };
    const match = story.content?.match(/<img[^>]*src=["']([^"']*)["'][^>]*>/);
    const imgSrc = match ? match[1] : '';
    const h1match = story.content?.match(/<h1[^>]*([\s\S]*?)<\/h1>/);
    const h1Element = h1match ? h1match[1] : '';
    const H1Element = stripHtmlTags(h1Element)
    const contentWithoutH1 = story.content!.replace(/<h1[^>]*>[\s\S]*?<\/h1>/g, '');
    const textWithoutHtml = stripHtmlTags(contentWithoutH1);
    const first30Words = textWithoutHtml.split(/\s+/).slice(0, 30).join(' ');
    return(
        <div className='mt-5'>
                
                        
                    
                            <Link key={story.id} href={`/published/${story.id}`} className='my-8 border-b[1px]
                            pb-10 border-neutral-100'>
                                <AuthorDetail story={story}/>
                                <div className='grid md:grid-cols-4gap-10 grid-cols-2'>
                                    <div className='md:col-span-3'>
                                        <h1 className='text-xl font-boldpy-3'>{H1Element}</h1>
                                        <p className='max-md:hiddentext-neutral-600 font-serif'>
                                            {first30Words} ...
                                        </p>
                                        <div className='flex items-center space-x-5 mt-6'>
                                            {story.topics && (
                                                <span className='bg-neutral-50px-2 py-1 rounded-full text-[13px]'>
                                                    {story.topics}</span>
                                            )}
                                            <ClapComponent storyId={story.id} UserClaps={userClaps} ClapCount={totalClaps} />
                                            <SaveComponent storyId={story.id} SavedStatus={SavedStatus} />
                                        </div>
                                    </div>
                                    <Image width={200} height={200}
                                        src={imgSrc ? imgSrc : '/no-image.jpg'} alt='Story Image' />

                                </div>

                            </Link>
                        
                 

                </div>
    )
}

export default StoryItem