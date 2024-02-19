import { useState } from 'react';
import axios from 'axios';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/api/createPost', { title, content });
      setTitle('');
      setContent('');
      setError('');
      setIsLoading(false);
      // Optionally, you can redirect the user to the blog post list page after successful submission
      window.location.href = '/Dashboard'; 
    } catch (error) {
      setError('An error occurred while creating the post. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
};

export default CreatePostForm;