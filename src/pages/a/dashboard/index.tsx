import Link from 'next/link';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/libs/session';
import { User } from 'pages/api/user';

import { InferGetServerSidePropsType } from 'next';

const Dashboard = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <div>Dashboard!</div>
      <Link href={'/api/logout'}>Logout</Link>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: {
          isLoggedIn: false,
          id_user: null,
          username: null,
          profile: null,
          token: null,
        } as User,
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
},
sessionOptions);

export default Dashboard;
