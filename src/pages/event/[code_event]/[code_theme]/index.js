import { useRouter } from 'next/router';
import ContainerBlank from '@/layouts/container/containerBlank';
import _ from 'lodash';
import qs from 'qs';
import { addDays } from 'date-fns';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

import SwitchTheme from '@/components/theme/switchTheme';
import LoadingPage from '@/components/specific/loadingPage';

function ThemeDetail({ data }) {
  const router = useRouter();
  const guest = router.query.to || 'Tamu Undangan';

  if (router.isFallback) {
    return <LoadingPage />;
  }

  const options = {
    from: 'theme',
    guest: guest,
    id: data.id_theme,
    code: data.code,
    date: addDays(new Date(), Math.floor(Math.random() * (60 - 30 + 1) + 30)),
  };

  return (
    <ContainerBlank title={`Tema ${data.name}`} description={data.description}>
      <SwitchTheme options={options} data={data} />
    </ContainerBlank>
  );
}

export async function getServerSideProps({ params }) {
  const pParams = {
    where: [{ is_delete: false }, { 'event:code': params.code_event }],
    with: [
      { theme_category: true },
      { event: true },
      { theme_feature: true },
      { theme_feature_column: true },
      { theme_greeting: true },
    ],
  };

  const merge = qs.stringify(pParams);
  const res = await fetch(`${coreUrl}/v1/theme/${params.code_theme}?${merge}`);
  const data = await res.json();

  if (data.error === 1) {
    return {
      notFound: true,
    };
  }

  return { props: { data: data.data } };
}

export default ThemeDetail;
