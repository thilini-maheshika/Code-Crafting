import { connectToDB } from "@src/utils/database";
import Prompt from "@src/models/prompt";

export const GET = async (request, { params}) => {
    try{
        await connectToDB();
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');

        console.log(prompts);

        return new Response(JSON.stringify(prompts), {
            status: 200 })

    }catch(error){
        return new Response('Failed to fetch all prompts', {
            status: 500 })
    }
}