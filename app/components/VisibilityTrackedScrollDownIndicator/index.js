import React from 'react';
import TrackVisibility from 'react-on-screen';
import ScrollDownIndicator from 'react-landing-page/dist/atoms/ScrollDownIndicator';

export const VisibilityTrackedScrollDownIndicator = props => (
  <TrackVisibility partialVisibility>
    {({ isVisible }) =>
      isVisible ? <ScrollDownIndicator {...props} /> : <div />
    }
  </TrackVisibility>
);
