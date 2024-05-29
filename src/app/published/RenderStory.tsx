import { Story } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import ClapComponent from "./ClapComponent";
import CommentComponent from "./CommentComponent";
import SaveComponent from "./SaveComponent";
import ShareComponent from "./ShareComponent";
import { ClapCount, ClapCountByUser } from "@/actions/Clap";

type Props ={
    AuthorFirstName:string | null
    AuthorLastName:string | null
    AuthorImage:string 
    PublishedStory: Story

}

const RenderStory = async ({AuthorFirstName, AuthorImage,
AuthorLastName,PublishedStory}: Props) => {

    const stripHtmlTags = (htmlString:string) => {
        return htmlString.replace(/[<^>]*>/g, "");
    };

    const h1match =PublishedStory.content!.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const h1Element =h1match ? h1match[1] : "";
    const h1elementwithouttag = stripHtmlTags(h1Element)

    const clapCounts =await ClapCount (PublishedStory.id)

    const UserClaps = await ClapCountByUser(PublishedStory.id)
    return (
        <div className="flex items-center justify-center mt-6 max-w-
        [800px] mx-auto">
            <div>
                <h1 className="text-4xl font-bold my-8">
                {h1elementwithouttag}</h1>
                <div className="flex items-center space-x-5">
                    <Image src={AuthorImage}
                    className='rounded-full' width={44}
                    height={44} alt='User'/>
                    <div className="text-sm">
                        <p>{AuthorFirstName} {AuthorLastName}
                        <span className="font-medium text-red-400
                        cursor-pointer">. follow</span></p>
                        <p className="opacity-60">Published on {new
                        Date (PublishedStory.updatedAt).toDateString
                        ().split(' ').slice(1,4).join(' ')}</p>
                    </div>
                </div>
                <div className="border-y-[1px] border-neutral-200
                py-3 mt-6 flex items-center justify-between px-3">
                    <div className="flex items-center space-x-4">
                        <ClapComponent storyId={PublishedStory.id}
                        ClapCount={clapCounts} UserClaps={UserClaps}/>
                        <CommentComponent/>
                    </div>
                    <div className="flex items-center space-x-4">
                        <SaveComponent/>
                        <ShareComponent/>
                        <button>
                            <MoreHorizontal size={24}
                            className="opacity-80 text-green-800"/>
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default RenderStory