import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();

    try{
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify({
            message: "Prompt created successfully",
            prompt: newPrompt
        }), {
            status: 200
        })

    }catch(error){
        return new Response(JSON.stringify({
            message: "Error creating prompt",
            error
        }), {
            status: 500
        })
    }
}