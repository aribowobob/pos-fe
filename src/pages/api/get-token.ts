import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  code: number;
  message: string;
  data: null | string;
  error: null | string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { headers } = req;
  const { token } = headers;

  if (!token) {
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized',
      data: null,
      error: 'Unauthorized',
    });
  }

  const getUserInfo = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`
  );
  const responseUserInfo = await getUserInfo.json();

  if (responseUserInfo.error) {
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized',
      data: null,
      error: 'Unauthorized',
    });
  }

  const { id, email } = responseUserInfo;

  res.status(200).json({
    code: 200,
    message: 'Success',
    data: `${id}-${email}`,
    error: null,
  });
}
