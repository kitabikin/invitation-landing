import type { IronSessionOptions } from 'iron-session';
import type { User } from '@/pages/api/user';

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'kitabikin-cookie',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
  }
}
