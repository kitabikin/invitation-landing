import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import site from '@/config/site';

export const authOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      async authorize(credentials) {
        const response = await fetch(`${site.siteUrl}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });
        const res = await response.json();

        if (res.error === 1) {
          throw new Error('Username dan Kata Sandi tidak ditemukan.');
        } else {
          return res.data;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const isUserSignedIn = user ? true : false;
      if (isUserSignedIn) {
        token.accessToken = user?.token;
        token.id_user = user?.id_user;
        token.username = user?.username;
        token.name = user?.profile?.name;
        token.role = user?.role[0]?.code;
      }

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      const initial = token.name
        .match(/(\b\S)?/g)
        .join('')
        .match(/(^\S|\S$)?/g)
        .join('')
        .toUpperCase();
      const image = `https://avatars.dicebear.com/api/initials/${initial}.svg`;

      session.user.id_user = token.id_user;
      session.user.username = token.username;
      session.user.name = token.name;
      session.user.email = `${token.username}@kitabikin.com`;
      session.user.image = image;
      session.user.role = token.role;
      session.accessToken = token.accessToken;

      return Promise.resolve(session);
    },
  },
};

export default NextAuth(authOptions);
