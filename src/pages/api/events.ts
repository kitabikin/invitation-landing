import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/libs/session';

import { NextApiRequest, NextApiResponse } from 'next';

async function eventsRoute(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user;

  if (!user || user.isLoggedIn === false) {
    res.status(401).end();
    return;
  }

  try {
    const events = {};

    res.json(events);
  } catch (error) {
    res.status(200).json([]);
  }
}

export default withIronSessionApiRoute(eventsRoute, sessionOptions);
