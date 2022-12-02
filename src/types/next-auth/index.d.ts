import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: {
      id_user: string;
      username: string;
    } & DefaultSession['user'];
  }
}
