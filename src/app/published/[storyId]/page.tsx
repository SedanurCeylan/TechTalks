import { getuser } from "@/actions/User"
import { getPublishedStoryById } from "@/actions/getStories"
import Navbar from "@/components/Navbar"
import RenderStory from "../RenderStory"


const page = async ({ params }: { params: { storyId: string } }) => {
    const PublishedStory = await getPublishedStoryById(params.storyId)

    if(!PublishedStory.response){
        return(
            <div>
                No Stories were found 
            </div>
        )
    }

    const Author = await getuser(PublishedStory.response?.authorId)
    return (
        <div>
            <Navbar/>
            <RenderStory AuthorFirstName={Author.firstName}
            AuthorImage={Author.imageUrl}AuthorLastName=
            {Author.lastName} PublishedStory=
            {PublishedStory.response} />
        </div>
    )

}

export default page