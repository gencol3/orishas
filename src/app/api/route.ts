// src/app/api/createPost.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@vercel/postgres';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    // Create a new PostgreSQL client
    const client = createClient({
      ssl: true,
      connectionString: process.env.POSTGRES_URL,
    });

    try {
      // Connect to the database
      await client.connect();

      // Execute the SQL query to insert a new post
      const result = await client.query(
        'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
        [title, content]
      );

      // Send the response with the newly created post
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      // Close the database client
      await client.end();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
