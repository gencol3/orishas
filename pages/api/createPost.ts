import pool from '../../src/app/db'; // Import your database connection
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { title, content } = req.body;

  try {
    const client = await pool.connect();
    await client.query('INSERT INTO posts (title, content) VALUES ($1, $2)', [title, content]);
    await client.release();
    return res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
