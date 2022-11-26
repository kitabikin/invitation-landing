import type { User } from './user';

import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/libs/session';
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
        const result = data.data;
        const user: User = {
          isLoggedIn: true,
          id_user: result.id_user,
          username: result.username,
          profile: result.profile,
          token: result.token,
        };

        req.session.user = user;
        await req.session.save();
      }

      return res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
