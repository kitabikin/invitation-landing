import qs from 'qs';
import useSWR from 'swr';
import type { User } from '@/pages/api/user';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

export function useInvitation(user: User | undefined, { params }) {
  const merge = qs.stringify(params);
  const { data, error, mutate } = useSWR([
    `${coreUrl}/v1/invitation?${merge}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    },
  ]);

  return {
    invitation: data,
    isLoading: !error && !data,
    isError: error,
    mutateInvitation: mutate,
  };
}

export function useInvitationSingle(user: User | undefined, { code, params }) {
  const merge = qs.stringify(params);
  const { data, error, mutate } = useSWR([
    `${coreUrl}/v1/invitation/${code}?${merge}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    },
  ]);

  return {
    invitation: data,
    isLoading: !error && !data,
    isError: error,
    mutateInvitation: mutate,
  };
}
