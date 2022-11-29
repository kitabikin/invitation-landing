import qs from 'qs';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from '@chakra-ui/react';
import { User } from '@/pages/api/user';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

const updateGuestbook = async (
  user: User | undefined,
  { id, body, params = {} },
) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation-guest-book/${id}?${merge}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

const GuestbookSend = ({ user, id, isSend }) => {
  const queryClient = useQueryClient();

  const params = {
    modified_at: false,
  };
  const mutation = useMutation({
    mutationFn: (body: any) => updateGuestbook(user, { id, body, params }),
    onSuccess: () => {
      queryClient.invalidateQueries(['guestbook']);
    },
  });

  const handleSend = ({ isSend }) => {
    mutation.mutate({
      is_send: isSend,
    });
  };

  return (
    <Button
      size={'xs'}
      variant="outline"
      colorScheme="gray"
      onClick={() =>
        handleSend({
          isSend: !isSend,
        })
      }
    >
      {isSend ? 'Tandai belum terkirim' : 'Tandai sudah terkirim'}
    </Button>
  );
};

export default GuestbookSend;
