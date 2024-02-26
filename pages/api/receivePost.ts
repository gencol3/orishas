import pool from '../../src/app/db'; // Import your database connection
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM posts');
    await client.release();

    // Extract the rows from the query result
    const posts = result.rows;

    return res.status(200).json({ posts }); // Return the posts in the response
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}