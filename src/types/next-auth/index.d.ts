import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: {
      id_user: string;
      username: string;
      role: string;
    } & DefaultSession['user'];
  }
}
