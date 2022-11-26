import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/libs/session';
import { NextApiRequest, NextApiResponse } from 'next';

export type User = {
  isLoggedIn: boolean;
  id_user: string;
  username: string;
  profile: Profile;
  token: string;
};

export type Profile = {
  id_profile: boolean;
  name: string;
  photo: string;
};

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
      id_user: null,
      username: null,
      profile: null,
      token: null,
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
