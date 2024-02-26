import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';

interface EditPostFormProps {
  postId: number; // Pass postId as a prop
  initialTitle: string; // Pass initialTitle as a prop
  initialContent: string; // Pass initialContent as a prop
}

const EditPostForm: React.FC<EditPostFormProps> = ({ postId, initialTitle, initialContent }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`/api/editPost`, {postId, title, content });
      setError('');
      setIsLoading(false);
      window.location.href = '/dashboard'; // Redirect after successful submission
    } catch (error) {
      setError('An error occurred while updating the post. Please try again later.');
      setIsLoading(false);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Render form only when initial values are available
  if (!initialTitle || !initialContent) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
          className='block w-full bg-gray-200 rounded-md border border-gray-200 py-[9px] pl-10 text-black outline-2 placeholder:text-gray-500'
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          required
          className='block w-full bg-gray-200 rounded-md border border-gray-200 py-[9px] pl-10 text-black outline-2 placeholder:text-gray-500'
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Post'}
      </button>
    </form>
  );
};

export default EditPostForm;