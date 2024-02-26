'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Define an interface for a post
interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

const DisplayPost = () => {
    // State to store the fetched posts
    const [posts, setPosts] = useState<Post[]>([]); // Use the Post interface as the type

    useEffect(() => {
        // Fetch posts when the component mounts
        axios.get('/api/receivePost').then((res) => {
            // Set the fetched posts in state
            setPosts(res.data.posts);
        }).catch((error) => {
            console.error('Error fetching posts:', error);
        });
    }, []); // Empty dependency array ensures the effect runs only once, when the component mounts

    return (
        <div>
            <h2>Display Posts</h2>
            {/* Render each post */}
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>Created at: {post.created_at}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayPost;
