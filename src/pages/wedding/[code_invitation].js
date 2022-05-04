import { useRouter } from 'next/router';
import ContainerBlank from '@/layouts/container/containerBlank';
import { NextSeo } from 'next-seo';
import site from '@/config/site';
import _ from 'lodash';
import qs from 'qs';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;
const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

import SwitchTheme from '@/components/theme/switchTheme';
import LoadingPage from '@/components/specific/loadingPage';

function WeddingDetail({ data, greeting }) {
  const router = useRouter();
  const guest = router.query.to || 'Tamu Undangan';

  if (router.isFallback) {
    return <LoadingPage />;
  }

  const options = {
    from: 'invitation',
    guest: guest,
    id: data.id_invitation,
    code: data.theme.code,
    date: new Date(data.invitation_at),
  };

  const canonical = `${site.siteUrl}/wedding/${data.code}`;
  const noIndex = !isProduction;

  return (
    <>
      <NextSeo
        title={`Pernikahan ${data.name}`}
        titleTemplate={`%s | ${site.title}`}
        description={data.description}
        canonical={canonical}
        noindex={noIndex}
        openGraph={{
          url: canonical,
          title: `Pernikahan ${data.name}`,
          description: data.description,
          site_name: site.title,
        }}
      />
      <SwitchTheme options={options} data={data} greeting={greeting} />
    </>
  );
}

async function getData(params) {
  const pParams = {
    where: [{ 'event:code': 'wedding' }],
    with: [
      { event: true },
      { theme: true },
      { invitation_feature: true },
      { invitation_feature_data: true },
    ],
  };

  const merge = qs.stringify(pParams);
  const res = await fetch(
    `${coreUrl}/v1/invitation/${params.code_invitation}?${merge}`,
  );
  const data = await res.json();

  return data;
}

async function getGreeting(idInvitation) {
  const pParams = {
    where: [
      { is_active: true },
      { is_delete: false },
      { id_invitation: idInvitation },
    ],
    sort: 'created_at:desc',
  };

  const merge = qs.stringify(pParams);
  const res = await fetch(`${coreUrl}/v1/invitation-greeting?${merge}`);
  const data = await res.json();

  return data;
}

export async function getServerSideProps({ params }) {
  const data = await getData(params);

  if (data.error === 1) {
    return {
      notFound: true,
    };
  }

  const greeting = await getGreeting(data.data.id_invitation);

  return { props: { data: data.data, greeting: greeting.data } };
}

WeddingDetail.Layout = function getLayout(page) {
  return <ContainerBlank>{page}</ContainerBlank>;
};

export default WeddingDetail;
