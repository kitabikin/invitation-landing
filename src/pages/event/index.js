import ContainerDefault from '@/layouts/container/containerDefault'
import { NextSeo } from 'next-seo'
import site from '@/config/site'

function Event() {
  return (
    <>
      <NextSeo
        title="Event"
        titleTemplate={`%s | ${site.title}`}
        description={site.description}
      />
      <div>Event</div>
      <div>get list event</div>
    </>
  )
}

Event.Layout = function getLayout(page) {
  return <ContainerDefault>{page}</ContainerDefault>
}

export default Event
