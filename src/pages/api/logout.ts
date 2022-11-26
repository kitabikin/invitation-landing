import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/libs/session';
import { NextApiRequest, NextApiResponse } from 'next';
import type { User } from 'pages/api/user';

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy();
  res.setHeader('location', '/login');
  res.statusCode = 302;
  res.end();
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
