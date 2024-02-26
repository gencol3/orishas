import pool from '../../src/app/db'; // Adjust the path accordingly
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const client = await pool.connect();
    // Fetch the initial post data from your database
    const result = await client.query('SELECT id, title, content FROM posts WHERE id = $1', [req.query.postId]);

    await client.release();
    if (result.rows.length > 0) {
        const { id, title, content } = result.rows[0];
        return res.status(200).json({ postId: id, title, content });
    } else {
        return res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error fetching post data:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
