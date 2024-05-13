import React from 'react'
import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
    return (
        <section className='flex-col w-full max-w-full flex-start'>
            <h1 className='text-left sub_head_text '>
                <span className='blue_gradient'>
                    {type} Post
                </span></h1>
            <p className='max-w-md text-left desc'>
                {type} and share your thoughts with the world.
                Craftopia inviting you to explore, discover, and cherish unique creations.
            </p>

            <form
                onSubmit={handleSubmit}
                className='mt-10 w-full max-w-2xl flex flex-co; gap-7 glassmorphism flex-col '
            >
                <label className='w-full'>
                    <span className='text-base font-semibold text-gray-700 font-satoshi '>Your AI generated Prompt</span>

                    <textarea
                        value={post.prompt}
                        onChange={(e) => setPost({
                            ...post,
                            prompt: e.target.value
                        })}
                        required
                        placeholder='Start your post here...'
                        className='form_textarea'
                    />

                </label>

                <label className='w-full'>
                    <span className='text-base font-semibold text-gray-700 font-satoshi '>Tag {''} </span>
                    <span className='font-normal'>(#coding, #webdesign, #codechallenge)</span>

                    <input
                        value={post.tag}
                        onChange={(e) => setPost({
                            ...post,
                            tag: e.target.value
                        })}
                        placeholder='#tag'
                        required
                        className='form_input'
                    />
                </label>

                <div className='gap-4 mx-3 mb-5 flex-end'>
                    <Link href={'/'} className='text-sm text-gray-500'>Cancel</Link>
                    <button 
                        type='submit' 
                        disabled={submitting} 
                        className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white '>
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Form