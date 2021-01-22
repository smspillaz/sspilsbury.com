import React from 'react';
import PropTypes from 'prop-types';

import { ImageAbsoluteParent } from 'components/ImageAbsoluteParent';

export const CrossBlurFadeBackgroundImage = ({
  selected,
  url,
  visible = true,
  styleProps = {},
}) => (
  <ImageAbsoluteParent
    key={url}
    style={{
      backgroundImage: visible ? ['url(', url, ')'].join('') : '',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '8px',
      transform: selected ? 'scale(0.9)' : '',
      opacity: selected ? 1 : 0,
      filter: !selected ? 'blur(16px)' : undefined,
      transition: 'all 1.5s ease-in-out',
      ...styleProps,
    }}
  />
);

CrossBlurFadeBackgroundImage.propTypes = {
  selected: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  styleProps: PropTypes.object,
};
