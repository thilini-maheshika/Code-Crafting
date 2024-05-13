'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router' // Use useRouter instead of next/navigation
import { useSearchParam } from 'react-use'

import Form from '@components/Form'

const EditPrompt = () => {
  const router = useRouter();
  const promptId = useSearchParam('id'); // Using useSearchParam instead of useSearchParams

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  useEffect(() => {
    const getPromptdetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (response.ok) {
          const data = await response.json();
          setPost({
            prompt: data.prompt,
            tag: data.tag
          });
        } else {
          console.error('Failed to fetch prompt details');
        }
      } catch (error) {
        console.error('Error fetching prompt details:', error);
      }
    };

    if (promptId) getPromptdetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      alert('Prompt ID not found');
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to update prompt:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating prompt:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
