import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import EditPostForm from '../../ui/editPostForm';

const EditPostPage = () => {
  const router = useRouter();
  const { postId } = router.query; // Get postId from the URL query parameter

  // State to store post data
  const [postData, setPostData] = useState<{ title: string; content: string }>({ title: '', content: '' });

  useEffect(() => {
    // Fetch post data when postId changes
    if (typeof postId === 'string') { // Check if postId is a string
      const id = parseInt(postId); // Parse postId to a number
      axios.get(`/api/getPostData/${id}`)
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

  return (
    <main>
      {/* Render EditPostForm with fetched post data */}
      <EditPostForm
        postId={typeof postId === 'string' ? parseInt(postId) : 0} // Parse postId to number, provide a default value of 0 if postId is undefined
        initialTitle={postData.title}
        initialContent={postData.content}
      />
    </main>
  );
};

export default EditPostPage;
