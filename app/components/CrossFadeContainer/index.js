import React from 'react';
import PropTypes from 'prop-types';

import { ImageAbsoluteParent } from 'components/ImageAbsoluteParent';

// eslint-disable-next-line
export class CrossFadeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.transitionHandle = -1;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.transitionHandle = window.setTimeout(() => {
        this.transitionHandle = 0;
      }, 150);
    }
  }

  render() {
    return (
      <ImageAbsoluteParent
        style={{
          opacity: this.props.selected ? 1 : 0,
          transition: 'all 1.5s ease-in-out',
        }}
      >
        {(this.props.selected || this.transitionHandle > -1) &&
          this.props.children}
      </ImageAbsoluteParent>
    );
  }
}

CrossFadeContainer.propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};
