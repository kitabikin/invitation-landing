import ContainerBlank from '@/layouts/container/containerBlank'
import { NextSeo } from 'next-seo'
import site from '@/config/site'
import _ from 'lodash'
import qs from 'qs'

const coreUrl = process.env.CORE_URL

import Cover from '@/components/theme/golden-gold/cover'

function WeddingDetail({ data }) {
  const { feature } = data

  const item = (code, data = feature) => {
    return _.find(data, {
      theme_feature: { code: code },
    })
  }

  const code = 'golden-gold_'
  const general = item(`${code}general`)
  const cover = item(`${code}cover`)

  return (
    <>
      <NextSeo
        title={`Pernikahan ${data.name}`}
        titleTemplate={`%s | ${site.title}`}
        description={data.description}
      />
      {cover.is_active && <Cover general={general} cover={cover} />}

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  )
}

export async function getStaticPaths() {
  const pWhere = [
    { is_delete: false },
    { id_event: '2b3b4de1-ed5c-4b5a-9b62-1059344c5775' },
  ]

  const pParams = {
    where: pWhere,
  }

  const merge = qs.stringify(pParams)
  const res = await fetch(`${coreUrl}/v1/invitation?${merge}`)
  const datas = await res.json()

  const paths = datas.data.map(data => ({
    params: { code_invitation: data.code },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const pParams = {
    with: [{ invitation_feature: true }],
  }

  const merge = qs.stringify(pParams)
  const res = await fetch(
    `${coreUrl}/v1/invitation/${params.code_invitation}?${merge}`
  )
  const data = await res.json()

  return { props: { data: data.data } }
}

WeddingDetail.Layout = function getLayout(page) {
  return <ContainerBlank>{page}</ContainerBlank>
}

export default WeddingDetail
