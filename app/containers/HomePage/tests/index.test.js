import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import preset from '@rebass/preset';

import HomePage from '../index';
import { PostPreviews } from '../../PostPreviews';

describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <ThemeProvider theme={preset}>
          <PostPreviews.Provider
            value={{
              loading: false,
              error: null,
              posts: [],
            }}
          >
            <HomePage animating={false} />
          </PostPreviews.Provider>
        </ThemeProvider>
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
