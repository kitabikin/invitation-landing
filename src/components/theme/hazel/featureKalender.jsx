import _ from 'lodash';
import { reduceFeature } from '@/libs/utils';

import ButtonSolid from '@/components/theme/hazel/buttonSolid';

function FeatureKalender({ ...props }) {
  // Get Data ==================================================================
  // Kalender
  const codeKalender = `${props.options.code}-kalender${props.type}`;
  const calendar = reduceFeature(props.feature[codeKalender].column);
  const {
    [`${codeKalender}-buttonLabel`]: kalenderButtonLabel,
    [`${codeKalender}-link`]: kalenderLink,
  } = calendar;

  return (
    <>
      <ButtonSolid as="a" href={kalenderLink.value} target={'_blank'}>
        {kalenderButtonLabel.value}
      </ButtonSolid>
    </>
  );
}

export default FeatureKalender;
