import ContainerDefault from '@/layouts/container/containerDefault'
import { NextSeo } from 'next-seo'
import site from '@/config/site'

import { useRouter } from 'next/router'

function EventDetail() {
  const router = useRouter()
  const { code_event } = router.query

  return (
    <>
      <NextSeo
        title="Event Detail"
        titleTemplate={`%s | ${site.title}`}
        description={site.description}
      />
      <div>Event Detail ({code_event})</div>
      <div>get single event by code</div>
      <div>get list theme category by event</div>
    </>
  )
}

EventDetail.Layout = function getLayout(page) {
  return <ContainerDefault>{page}</ContainerDefault>
}

export default EventDetail
