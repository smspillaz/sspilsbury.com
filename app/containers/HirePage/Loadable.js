/**
 * Asynchronously loads the component for HirePage
 */
import React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

import { Heading } from 'rebass/styled-components';
import { Hero } from 'react-landing-page';

import messages from './messages';

const Splash = () => (
  <Hero color="black" bgOpacity={0.0}>
    <div
      style={{
        height: '100%',
        textAlign: 'center',
        zIndex: 1,
      }}
    >
      <Heading fontSize={[5, 6, 7]}>
        <FormattedMessage {...messages.talk} />
      </Heading>
    </div>
  </Hero>
);

export default Loadable({
  loader: () => import('./index'),
  loading: Splash,
});
