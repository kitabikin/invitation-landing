import { Fragment, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  getGuestbookTemplate,
  updateGuestbookTemplate,
} from '@/libs/fetchQuery';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  SimpleGrid,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { MdModeEdit, MdLink } from 'react-icons/md';
import site from '@/config/site';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

const replaceTemplate = (template, data) => {
  const pattern = /{\s*(\w+?)\s*}/g; // {property}
  return template.replace(pattern, (_, token) => data[token] || '');
};

const GuestbookMessage = ({ id, guest = 'Tamu Undangan' }) => {
  // Settings
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const toast = useToast();
  const router = useRouter();
  const { code_invitation } = router.query;

  // State
  const [isEdit, setIsEdit] = useState(false);
  const [value, copy] = useCopyToClipboard();
  const inputRef = useRef<HTMLTextAreaElement>();

  // Get Data
  const { isLoading, data: guestbookTemplate } = useQuery({
    queryKey: ['guestbook-template', id],
    queryFn: () => getGuestbookTemplate(session?.accessToken, { id }),
  });

  const mutation = useMutation({
    mutationFn: (body: any) =>
      updateGuestbookTemplate(session?.accessToken, { id, body }),
    onSuccess: () => {
      queryClient.invalidateQueries(['guestbook-template']);
    },
  });

  // Action
  const onSubmit = (e) => {
    e.preventDefault();

    if (guestbookTemplate.template !== inputRef.current.value) {
      mutation.mutate({
        template: inputRef.current.value,
      });
    }

    setIsEdit(!isEdit);
  };

  const onCopy = (e) => {
    e.preventDefault();

    copy(templateResult());

    toast({
      title: `Tersalin`,
      position: 'top',
    });
  };

  const templateResult = () => {
    return replaceTemplate(guestbookTemplate.template, {
      link: `${site.siteUrl}/wedding/${code_invitation}?to=${encodeURIComponent(
        guest,
      )}`,
    });
  };

  return (
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={4}
      h={'full'}
      px={{ base: 0, md: 12 }}
    >
      {isEdit && (
        <Alert status="warning">
          <AlertIcon />
          Jangan mengubah {'{link}'}
        </Alert>
      )}

      <Box
        pos={'relative'}
        w={'100%'}
        borderRadius={'xl'}
        bg={'green.100'}
        _after={{
          content: "''",
          position: 'absolute',
          width: 0,
          height: 0,
          top: '15px',
          right: 'auto',
          bottom: 'auto',
          left: '-20px',
          border: '12px solid',
          borderTopColor: 'green.100',
          borderRightColor: 'green.100',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
        }}
      >
        <Box p={4}>
          {isLoading ? (
            <Box>Loading...</Box>
          ) : (
            <Fragment>
              {!isEdit ? (
                <Box whiteSpace={'pre-wrap'} fontSize={'sm'}>
                  {templateResult()}
                </Box>
              ) : (
                <Textarea
                  ref={inputRef}
                  rows={25}
                  bg={'white'}
                  defaultValue={guestbookTemplate.template}
                  placeholder=""
                  size="sm"
                />
              )}
            </Fragment>
          )}
        </Box>
      </Box>
      {!isEdit ? (
        <SimpleGrid columns={2} spacing={4} w={'full'}>
          <Button
            size={'sm'}
            variant="solid"
            colorScheme="pink"
            leftIcon={<MdModeEdit />}
            onClick={() => setIsEdit(!isEdit)}
          >
            Ubah Template
          </Button>
          <Button
            size={'sm'}
            variant="outline"
            colorScheme="teal"
            leftIcon={<MdLink />}
            onClick={onCopy}
          >
            Salin Pesan
          </Button>
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={1} spacing={4} w={'full'}>
          <Button
            size={'sm'}
            variant="solid"
            colorScheme="pink"
            onClick={onSubmit}
            type={'button'}
          >
            Simpan Template
          </Button>
        </SimpleGrid>
      )}
    </Flex>
  );
};

export default GuestbookMessage;
