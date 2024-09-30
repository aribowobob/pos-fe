import { NextApiRequest, NextApiResponse } from 'next';
import { dataproduct } from './constant';
import { IProductProps } from '@types';

let errorCode = 200;
let message = 'Success';
let data: IProductProps[] | IProductProps | null = null;

// Handle GET requests
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    // Logic for fetching a specific product by ID
    const searchId = parseInt(id as string, 10);
    const productSearch = dataproduct.find(product => product.id === searchId);

    if (productSearch) {
      data = [productSearch];
    } else {
      errorCode = 406;
      message = 'Produk tidak ditemukan sd sd';
    }
  } else {
    // Logic for fetching all products
    if (dataproduct.length > 0) {
      data = dataproduct;
    } else {
      errorCode = 404;
      message = 'Tidak ada produk yang ditemukan';
    }
  }

  res.status(errorCode).json({
    code: errorCode,
    message,
    data,
  });
};

// Handle POST requests
const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  // Logic for creating a new product
  res.status(201).json({ message: 'Creating a new product' });
};

// Handle PUT requests
const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    // Logic for updating a specific product by ID
    res.status(200).json({ message: `Updating product with id ${id}` });
  } else {
    res.status(400).json({ message: 'ID is required for updating a product' });
  }
};

// Handle DELETE requests
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    // Logic for deleting a specific product by ID
    res.status(200).json({ message: `Deleting product with id ${id}` });
  } else {
    res.status(400).json({ message: 'ID is required for deleting a product' });
  }
};

// Main handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await handleGet(req, res);
      break;
    case 'POST':
      await handlePost(req, res);
      break;
    case 'PUT':
      await handlePut(req, res);
      break;
    case 'DELETE':
      await handleDelete(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
