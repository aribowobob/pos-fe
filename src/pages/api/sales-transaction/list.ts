import type { NextApiRequest, NextApiResponse } from 'next';

import { SalesTransactionType } from '@store';

type Data = {
  code: number;
  message: string;
  data: null | SalesTransactionType;
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
    data: {
      date: '2022-07-22',
      items: [
        {
          productId: 1,
          productName: 'Lorem pulpy orange a 300ml x 12 botol @25000',
          quantity: 3,
          stock: 10,
          baseSalesPrice: 1000,
          discountType: 'PERCENTAGE',
          discountValue: 10,
          discountAmount: 100,
          salesPrice: 900,
          totalPrice: 2700,
        },
        {
          productId: 2,
          productName:
            'Ipsum pulpy orange a 300ml x 12 botol lorem ipsum dolor sit amet @25500',
          quantity: 30,
          stock: 170,
          baseSalesPrice: 10000,
          discountType: null,
          discountValue: 0,
          discountAmount: 0,
          salesPrice: 10000,
          totalPrice: 300000,
        },
        {
          productId: 3,
          productName: 'Dolorsit pulpy orange a 300ml x 12 botol @15000',
          quantity: 10,
          stock: 100,
          baseSalesPrice: 15000,
          discountType: 'FIXED',
          discountValue: 1000,
          discountAmount: 1000,
          salesPrice: 14000,
          totalPrice: 140000,
        },
        {
          productId: 4,
          productName: 'Amet pulpy orange a 300ml x 12 botol @5000',
          quantity: 10,
          stock: 100,
          baseSalesPrice: 5000,
          discountType: null,
          discountValue: 0,
          discountAmount: 0,
          salesPrice: 5000,
          totalPrice: 50000,
        },
        {
          productId: 5,
          productName: 'Notorieq pulpy orange a 300ml x 12 botol @75000',
          quantity: 10,
          stock: 100,
          baseSalesPrice: 75000,
          discountType: null,
          discountValue: 0,
          discountAmount: 0,
          salesPrice: 75000,
          totalPrice: 750000,
        },
      ],
    },
    error: null,
  });
}
