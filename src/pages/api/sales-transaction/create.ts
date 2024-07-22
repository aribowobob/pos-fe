import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  code: number;
  message: string;
  data: null | boolean;
  error: null | string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { headers } = req;
  const { authorization } = headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized',
      data: null,
      error: 'Unauthorized',
    });
  }

  res.status(200).json({
    code: 200,
    message: 'Success',
    data: true,
    error: null,
  });
}
