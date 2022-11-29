import qs from 'qs';
import useSWR from 'swr';
import type { User } from '@/pages/api/user';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

export default function useGuestbook(user: User | undefined, { params }) {
  const merge = qs.stringify(params);
  const { data, error, mutate } = useSWR([
    `${coreUrl}/v1/invitation-guest-book?${merge}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    },
  ]);

  return {
    guestbook: data,
    isLoading: !error && !data,
    isError: error,
    mutateGuestbook: mutate,
  };
}
