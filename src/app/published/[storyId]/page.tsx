import { getuser } from "@/actions/User"
import { getPublishedStoryById } from "@/actions/getStories"
import Navbar from "@/components/Navbar"
import RenderStory from "../RenderStory"
import AuthorSpecific from "../AuthorSpecific"
import { CheckSaved } from "@/actions/Save"


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
    const SavedStatus = await CheckSaved(params.storyId);
    return (
        <div>
            <Navbar/>
            <RenderStory AuthorFirstName={Author.firstName}
            AuthorImage={Author.imageUrl}AuthorLastName=
            {Author.lastName} PublishedStory=
            {PublishedStory.response} />
            <AuthorSpecific AuthorFirstName={Author.firstName}
            AuthorImage={Author.imageUrl}AuthorLastName=
            {Author.lastName} PublishedStory=
            {PublishedStory.response}  AuthorEmail={Author.emailAddresses[0].emailAddresses} SavedStatus={SavedStatus.Status}/>
        </div>
    )

}

export default page