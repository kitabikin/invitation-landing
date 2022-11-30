import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from '@chakra-ui/react';
import { updateGuestbook } from '@/libs/fetchQuery';

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
