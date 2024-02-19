import { Client } from 'pg';

export default async function handler(req, res) {
  const { title, content } = req.body;

  const client = new Client({
    connectionString: "postgres://default:6p8KNCuBHzAU@ep-aged-moon-a4o26jqp-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    const result = await client.query(
      'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
}