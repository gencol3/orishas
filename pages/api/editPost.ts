import pool from '../../src/app/db'; // Import your database connection
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') { // Adjust the method to PUT or PATCH
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { postId, title, content } = req.body; // Extract postId, title, and content from the request body

  try {
    const client = await pool.connect();
    
    // Fetch the post to ensure it exists
    const { rows } = await client.query('SELECT * FROM posts WHERE id = $1', [postId]);
    if (rows.length === 0) {
      await client.release();
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Update the post with the new title and content
    await client.query('UPDATE posts SET title = $1, content = $2 WHERE id = $3', [title, content, postId]);

    await client.release();
    return res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
