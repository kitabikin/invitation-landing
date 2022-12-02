import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = {
      ...req.body,
      application: 'invitation',
    };

    try {
      const response = await fetch(`${coreUrl}/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (data.error === 0) {
        const serialised = serialize('kitabikin-cookie', data.data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 30,
          path: '/',
        });

        res.setHeader('Set-Cookie', serialised);
        res.status(200).json(data);
      } else {
        res.status(401).json({ message: 'Invalid credentials!' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export default loginRoute;
