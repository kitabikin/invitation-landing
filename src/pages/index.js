import ContainerDefault from '@/layouts/container/containerDefault'
import { NextSeo } from 'next-seo'
import site from '@/config/site'

function Home() {
  return (
    <>
      <NextSeo title={site.title} description={site.description} />
      Content
    </>
  )
}

Home.Layout = function getLayout(page) {
  return <ContainerDefault>{page}</ContainerDefault>
}

export default Home
