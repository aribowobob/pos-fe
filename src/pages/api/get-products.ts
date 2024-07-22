import type { NextApiRequest, NextApiResponse } from 'next';

import { ProductItemType } from '@modules';

type Data = {
  code: number;
  message: string;
  data: null | ProductItemType[];
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
    data: [
      {
        id: 1,
        name: 'Lorem pulpy orange a 300ml x 12 botol @25000',
        price: 25000,
        stock: 25,
      },
      {
        id: 2,
        name: 'Ipsum pulpy orange a 300ml x 12 botol lorem ipsum dolor sit amet @25500',
        price: 25500,
        stock: 5,
      },
      {
        id: 3,
        name: 'Dolorsit pulpy orange a 300ml x 12 botol @15000',
        price: 15000,
        stock: 0,
      },
      {
        id: 4,
        name: 'Amet pulpy orange a 300ml x 12 botol @5000',
        price: 5000,
        stock: 1982,
      },
      {
        id: 5,
        name: 'Notorieq pulpy orange a 300ml x 12 botol @75000',
        price: 75000,
        stock: 0,
      },
    ],
    error: null,
  });
}
