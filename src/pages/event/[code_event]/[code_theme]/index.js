import ContainerBlank from '@/layouts/container/containerBlank'
import { NextSeo } from 'next-seo'
import site from '@/config/site'

import { useRouter } from 'next/router'

function ThemeDetail() {
  const router = useRouter()
  const { code_theme } = router.query

  return (
    <>
      <NextSeo
        title="Theme Detail"
        titleTemplate={`%s | ${site.title}`}
        description={site.description}
      />
      <div>Theme Detail ({code_theme})</div>
      <div>get single theme by code</div>
    </>
  )
}

ThemeDetail.Layout = function getLayout(page) {
  return <ContainerBlank>{page}</ContainerBlank>
}

export default ThemeDetail
