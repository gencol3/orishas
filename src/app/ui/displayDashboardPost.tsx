import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define an interface for a post
interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const DisplayDashboardPost = () => {
  const router = useRouter();

  // State to store the fetched posts
  const [posts, setPosts] = useState<Post[]>([]); // Use the Post interface as the type

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts when the component mounts
        const response = await axios.get('/api/receivePost');
        // Set the fetched posts in state
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditPost = (postId: number) => {
    // Redirect to the edit page with the postId as a query parameter
    if (router) {
      router.push(`/dashboard/edit-post/${postId}?postId=${postId}`);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      // Send a request to delete the post
      await axios.delete(`/api/deletePost/${postId}`);
      // Remove the deleted post from state
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h2>Display Posts</h2>
      <div className="flex flex-col gap-4">
        {/* Render each post */}
        {posts.map((post) => (
          <div key={post.id} className="flex flex-row gap-4">
            <h3>{post.title}</h3>
            <p>Created at: {post.created_at}</p>
            <Link href={`/articles/${post.id}`} passHref>
              View Post
            </Link>
            <button onClick={() => handleEditPost(post.id)}>Edit Post</button>
            <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayDashboardPost;
