import qs from 'qs';
import useSWR from 'swr';
import type { User } from '@/pages/api/user';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

export default function useGreeting(user: User | undefined, { params }) {
  const merge = qs.stringify(params);
  const { data, error } = useSWR([
    `${coreUrl}/v1/invitation-greeting?${merge}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    },
  ]);

  return {
    greeting: data,
    isLoading: !error && !data,
    isError: error,
  };
}
