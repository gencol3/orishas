import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../src/app/db'; // Adjust the path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const postId = req.query.postId;

    // Delete the post from your database
    const client = await pool.connect();
    await client.query('DELETE FROM posts WHERE id = $1', [postId]);
    await client.release();

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
