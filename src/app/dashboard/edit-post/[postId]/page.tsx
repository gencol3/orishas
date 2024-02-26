'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Import from next/navigation
import axios from 'axios';
import EditPostForm from '../../../ui/editPostForm';
import ProtectedRoute from '../../../ProtectedRoute';


const EditPostPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get postId from the URL query parameter
  const postId = searchParams ? searchParams.get('postId') : null;

  // State to store post data
  const [postData, setPostData] = useState<{ title: string; content: string }>({ title: '', content: '' });

  useEffect(() => {
    // Fetch post data when postId changes
    if (typeof postId === 'string') { // Check if postId is a string
      const id = parseInt(postId); // Parse postId to a number
      axios.get(`/api/getPostData?postId=${id}`)
        .then((response) => {
          setPostData(response.data); // Set the fetched post data
        })
        .catch((error) => {
          console.error('Error fetching post data:', error);
          // Handle error (e.g., redirect to dashboard)
          router.push('/dashboard');
        });
    }
  }, [postId]);

  // Handle the case where postId is undefined
  if (postId === undefined || postId === null) {
    return <div>Loading...</div>;
  }  

  return (
    <ProtectedRoute>
      <main>
        <EditPostForm
          postId={typeof postId === 'string' ? parseInt(postId) : 0} // Parse postId to number, provide a default value of 0 if postId is undefined
          initialTitle={postData.title}
          initialContent={postData.content}
        />
      </main>
    </ProtectedRoute>
  );
};

export default EditPostPage;
