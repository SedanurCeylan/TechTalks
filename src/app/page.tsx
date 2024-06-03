import Image from "next/image";
import Navbar from "../components/Navbar";
import StoryList from "@/components/StoryList";
import { getUniqueTopics } from "@/actions/getStories";
import { GetSelectedTopics } from "@/actions/Topics";

export default async function Home() {

  const allTopics = await getUniqueTopics()
  const UserTags = await GetSelectedTopics()
  return (
    <main>
      <Navbar />
      <div className='max-w-[1100px] mx-auto px-5 mt-12'>
        <StoryList allTopics={allTopics.response} UserTags={UserTags.Tags}/>
      </div>
    </main>
  );
}
