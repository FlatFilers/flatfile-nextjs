import api from '@flatfile/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    if (!id || typeof id !== 'string') throw new Error('No space ID provided');
    const space = await api.spaces.get(id);
    res.json({ space });
  } catch (error) {
    console.error('Error retrieving space:', error);
    res.status(500).json({ error: 'Failed to retrieve space' });
  }
}
