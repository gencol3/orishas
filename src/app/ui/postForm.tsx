import { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/api/createPost', { title, content });
      setTitle('');
      setContent('');
      setError('');
      setIsLoading(false);
      window.location.href = '/dashboard'; // Redirect after successful submission
    } catch (error) {
      setError('An error occurred while creating the post. Please try again later.');
      setIsLoading(false);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange} // Use handleTitleChange instead of anonymous function
          required
          className='block w-full bg-gray-200 rounded-md border border-gray-200 py-[9px] pl-10 text-black outline-2 placeholder:text-gray-500'
          placeholder='Enter the title of your post...'
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange} // Use handleContentChange instead of anonymous function
          required
          className='block w-full bg-gray-200 rounded-md border border-gray-200 py-[9px] pl-10 text-black outline-2 placeholder:text-gray-500'
          placeholder='Write your post here...'
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
};

export default CreatePostForm;
