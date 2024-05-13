import { connectToDB } from "@src/utils/database";
import Prompt from "@src/models/prompt";

//GET

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

//PATCH

export const PATCH = async (request, { params }) => {

    const { prompt , tag } = await request.json();

    try{
        await connectToDB();
        const existingprompt = await Prompt.findById(params.id);

        if(!prompt) return new Response("Prompts not found", {
            status: 404 })

            existingprompt.prompt = prompt;
            existingprompt.tag = tag;

        await existingprompt.save();
        return new Response(JSON.stringify(existingprompt), {status: 200 })

    }catch(error){
        return new Response('Failed to update all prompts', {
            status: 500 })
    }
}

//DELETE

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};