import Script from 'next/script'
import ContainerBlank from '@/layouts/container/containerBlank'
import { NextSeo } from 'next-seo'
import site from '@/config/site'

const isProduction = process.env.ENVIRONMENT === 'production'
const gaID = process.env.NEXT_PUBLIC_GA_ID

import { Container } from '@chakra-ui/react'
import ComingSoon from '@/components/specific/comingSoon'

function Home() {
  const canonical = site.siteUrl
  const noIndex = !isProduction

  return (
    <>
      {isProduction && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gaID}');
            `}
          </Script>
        </>
      )}

      <NextSeo
        title={site.title}
        description={site.description}
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
