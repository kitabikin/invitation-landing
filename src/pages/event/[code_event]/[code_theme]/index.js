import { useRouter } from 'next/router'
import ContainerBlank from '@/layouts/container/containerBlank'
import { NextSeo } from 'next-seo'
import site from '@/config/site'
import _ from 'lodash'
import qs from 'qs'
import { addDays } from 'date-fns'

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL

import SwitchTheme from '@/components/theme/switchTheme'

function ThemeDetail({ data }) {
  const router = useRouter()
  const guest = router.query.to || 'Tamu Undangan'

  const options = {
    from: 'theme',
    guest: guest,
    date: addDays(new Date(), 100),
  }

  return (
    <>
      <NextSeo
        title={`Tema ${data.name}`}
        titleTemplate={`%s | ${site.title}`}
        description={data.description}
      />
      <SwitchTheme options={options} data={data} />
    </>
  )
}

export async function getStaticPaths() {
  const pParams = {
    where: [{ is_delete: false }],
    with: [{ theme_category: true }, { event: true }],
  }

  const merge = qs.stringify(pParams)
  const res = await fetch(`${coreUrl}/v1/theme?${merge}`)
  const datas = await res.json()

  const paths = datas.data.map(data => ({
    params: {
      code_event: data.theme_category.event.code,
      code_theme: data.code,
    },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const pParams = {
    where: [{ is_delete: false }],
    with: [{ theme_feature: true }, { theme_feature_column: true }],
  }

  const merge = qs.stringify(pParams)
  const res = await fetch(`${coreUrl}/v1/theme/${params.code_theme}?${merge}`)
  const data = await res.json()

  return { props: { data: data.data } }
}

ThemeDetail.Layout = function getLayout(page) {
  return <ContainerBlank>{page}</ContainerBlank>
}

export default ThemeDetail
