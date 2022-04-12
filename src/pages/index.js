import ContainerBlank from '@/layouts/container/containerBlank'
import { NextSeo } from 'next-seo'
import site from '@/config/site'

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'

import { Container } from '@chakra-ui/react'
import ComingSoon from '@/components/specific/comingSoon'

function Home() {
  const canonical = site.siteUrl
  const noIndex = !isProduction

  return (
    <>
      <NextSeo
        title={site.titleHome}
        description={site.description}
        additionalMetaTags={[
          {
            property: 'keywords',
            content: site.keywords,
          },
        ]}
        canonical={canonical}
        noindex={noIndex}
      />
      <Container maxW="container.sm">
        <ComingSoon />
      </Container>
    </>
  )
}

Home.Layout = function getLayout(page) {
  return <ContainerBlank>{page}</ContainerBlank>
}

export default Home
