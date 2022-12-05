import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button, useToast } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { updateGuestbook } from '@/libs/fetchQuery';

const GuestbookSend = ({ id, isSend }) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const toast = useToast();

  const params = {
    modified_at: false,
  };
  const mutation = useMutation({
    mutationFn: (body: any) =>
      updateGuestbook(session?.accessToken, { id, body, params }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestbook'] });
    },
  });

  const handleSend = ({ isSend }) => {
    mutation.mutate({
      is_send: isSend,
    });
  };

  if (mutation.isError) {
    toast({
      title: 'Terjadi kesalahan.',
      description: 'Silahkan coba kembali.',
      status: 'error',
      position: 'bottom-left',
      isClosable: true,
    });
  }

  return (
    <Button
      type={'button'}
      size={'xs'}
      variant="outline"
      colorScheme="gray"
      onClick={() =>
        handleSend({
          isSend: !isSend,
        })
      }
      isLoading={mutation.isLoading ? true : false}
      loadingText="Loading..."
    >
      {isSend ? 'Tandai belum terkirim' : 'Tandai sudah terkirim'}
    </Button>
  );
};

export default GuestbookSend;
