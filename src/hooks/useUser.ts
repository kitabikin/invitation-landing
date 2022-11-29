import { useEffect } from 'react';
import Router from 'next/router';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { User } from '@/pages/api/user';

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const queryClient = useQueryClient();

  const fetchUser = (): Promise<User> =>
    fetch('/api/user').then((res) => res.json());

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  const mutateUser = useMutation({
    mutationFn: fetchUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      (redirectTo && !redirectIfFound && !user.isLoggedIn) ||
      (redirectIfFound && user.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
