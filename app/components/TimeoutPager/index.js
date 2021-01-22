import React from 'react';
import PropTypes from 'prop-types';

import TrackVisibility from 'react-on-screen';

export class TimeoutPager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.mounted = false;
    this.timer = 0;
  }

  componentDidMount() {
    this.mounted = true;
    if (this.props.running) {
      this.timer = window.setInterval(this.changeIndex, this.props.time);
    }
  }

  componentDidUpdate(prev) {
    if (!this.mounted) {
      return;
    }

    if (!this.timer) {
      if (this.props.running) {
        this.timer = window.setInterval(this.changeIndex, this.props.time);
      }
    } else if (!this.props.running) {
      window.clearInterval(this.timer);
      this.timer = null;
    } else if (this.props.time !== prev.time) {
      window.clearInterval(this.timer);
      this.timer = window.setInterval(this.changeIndex, this.props.time);
    }
  }

  changeIndex = () =>
    this.setState(state => ({
      index: (state.index + 1) % this.props.range,
    }));

  render() {
    return this.props.render({ index: this.state.index, visible: this.props.visible });
  }
}

TimeoutPager.propTypes = {
  time: PropTypes.number.isRequired,
  range: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired,
  running: PropTypes.bool,
  visible: PropTypes.bool,
};

TimeoutPager.defaultProps = {
  running: false,
  visible: true,
};

export const VisibilityTrackingTimeoutPager = props => (
  <TrackVisibility partialVisibility>
    {({ isVisible }) => <TimeoutPager running={isVisible} visible={isVisible} {...props} />}
  </TrackVisibility>
);
