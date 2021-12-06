import { useRouter } from 'next/router'
import ContainerBlank from '@/layouts/container/containerBlank'
import { NextSeo } from 'next-seo'
import site from '@/config/site'
import _ from 'lodash'
import qs from 'qs'

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL
const isProduction = process.env.ENVIRONMENT === 'production'

import SwitchTheme from '@/components/theme/switchTheme'
import LoadingPage from '@/components/specific/loadingPage'

function WeddingDetail({ data }) {
  const router = useRouter()
  const guest = router.query.to || 'Tamu Undangan'

  if (router.isFallback) {
    return <LoadingPage />
  }

  const options = {
    from: 'invitation',
    guest: guest,
    code: data.theme.code,
    date: new Date(data.invitation_at),
  }

  const canonical = `${site.siteUrl}/wedding/${data.code}`
  const noIndex = !isProduction

  return (
    <>
      <NextSeo
        title={`Pernikahan ${data.name}`}
        titleTemplate={`%s | ${site.title}`}
        description={data.description}
        canonical={canonical}
        noindex={noIndex}
      />
      <SwitchTheme options={options} data={data} />
    </>
  )
}

export async function getStaticPaths() {
  const pParams = {
    where: [{ is_delete: false }, { ['event:code']: 'wedding' }],
    with: [{ event: true }],
  }

  const merge = qs.stringify(pParams)
  const res = await fetch(`${coreUrl}/v1/invitation?${merge}`)
  const datas = await res.json()

  const paths = datas.data.map(data => ({
    params: { code_invitation: data.code },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const pParams = {
    with: [
      { theme: true },
      { invitation_feature: true },
      { invitation_feature_data: true },
    ],
  }

  const merge = qs.stringify(pParams)
  const res = await fetch(
    `${coreUrl}/v1/invitation/${params.code_invitation}?${merge}`
  )
  const data = await res.json()

  if (data.error === 1) {
    return {
      notFound: true,
    }
  }

  return { props: { data: data.data }, revalidate: 1 }
}

WeddingDetail.Layout = function getLayout(page) {
  return <ContainerBlank>{page}</ContainerBlank>
}

export default WeddingDetail
