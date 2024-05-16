import Navbar from "@/components/Navbar";
import React from "react";
import NewStory from "../New-Story";

type Props ={}

const page = ({ params }: { params: { storyId: string } }) => {
        console.log(params.storyId)
    return (
        <div className="max-w-[1000px] mx-auto">
            <Navbar/>
            <NewStory/>
        </div>
    )
}

export default page