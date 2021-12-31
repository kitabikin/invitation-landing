import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { Container, Box, Flex, Heading, Badge } from '@chakra-ui/react'

import ContainerBlank from '@/layouts/container/containerBlank'
import site from '@/config/site'

const isProduction = process.env.ENVIRONMENT === 'production'
const coreUrl = process.env.NEXT_PUBLIC_CORE_URL

function GuestBookDetail({ data }) {
  const canonical = `${site.siteUrl}/guest-book/${data.id_invitation_guest_book}}`
  const noIndex = true
  const seed = Math.floor(Math.random() * 100 + 1)

  return (
    <>
      <NextSeo
        title={`Buku Tamu`}
        titleTemplate={`%s | ${site.title}`}
        description={site.description}
        canonical={canonical}
        noindex={noIndex}
        openGraph={{
          url: canonical,
          title: `Buku Tamu`,
          description: site.description,
          site_name: site.title,
        }}
      />
      <Container maxW="container.sm" mt={4}>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p="6" textAlign={'center'}>
            <Flex justifyContent={'center'}>
              <Image
                width="150"
                height="150"
                alt="{data.name}"
                src={`https://avatars.dicebear.com/api/big-ears-neutral/${seed}.svg`}
              />
            </Flex>

            <Heading as="h3" size="lg" mt={4}>
              {data.name}
            </Heading>

            <Box
              display="flex"
              alignItems="baseline"
              justifyContent={'center'}
              mt="3"
            >
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {data.type}
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                SESI {data.session}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${coreUrl}/v1/invitation-guest-book/${params.id_invitation_guest_book}`
  )
  const data = await res.json()

  if (data.error === 1) {
    return {
      notFound: true,
    }
  }

  return { props: { data: data.data } }
}

GuestBookDetail.Layout = function getLayout(page) {
  return <ContainerBlank>{page}</ContainerBlank>
}

export default GuestBookDetail
