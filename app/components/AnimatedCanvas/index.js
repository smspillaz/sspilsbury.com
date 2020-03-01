import React from 'react';
import PropTypes from 'prop-types';
import TrackVisibility from 'react-on-screen';
import ContainerDimensions from 'react-container-dimensions';

import styled from 'styled-components';

const SizeTrackingContainer = styled.div`
  width: 100%;
  height: 100%;
`;

// eslint-disable-next-line react/forbid-foreign-prop-types
export const makeAnimatedCanvas = ({ init, update, propTypes = {} }) => {
  class AnimatedCanvas extends React.Component {
    constructor(props) {
      super(props);

      this.canvasRef = null;
      this.rafId = 0;
    }

    componentDidUpdate() {
      if (this.props.animating && this.canvasRef) {
        if (!this.objects) {
          // Not initialized yet
          this.updateAnimationState(this.props.animating);
        } else if (this.rafId === 0) {
          // Initialized, but we need to request a new frame
          this.rafId = window.requestAnimationFrame(this.repaint);
        }
      } else if (!this.props.animating && this.rafId !== 0) {
        // Not animating anymore, need to cancel animation frames
        window.cancelAnimationFrame(this.rafId);
        this.rafId = 0;
      }
    }

    updateAnimationState = animating => {
      if (this.canvasRef && animating && this.rafId === 0) {
        try {
          this.objects = init(this.canvasRef);
        } catch (e) {
          console.error(
            'Encountered error while creating AnimatedCanvas objects',
          );
          console.error(e);
          console.error(e.stack);

          console.error('Will not animate canvas');
        }
        this.lastTimestamp = performance.now();
        this.rafId = window.requestAnimationFrame(this.repaint);
      } else if (!this.canvasRef) {
        // No more canvas ref, need to deallocate
        if (this.rafId !== 0) {
          // Need to cancel any outstanding animation frames
          window.cancelAnimationFrame(this.rafId);
          this.rafId = 0;
        }
        this.objects = null;
      }
    };

    setCanvasRef = ref => {
      this.canvasRef = ref;
      this.updateAnimationState(this.props.animating);
    };

    repaint = ts => {
      this.rafId = window.requestAnimationFrame(this.repaint);
      update(this.lastTimestamp, ts, this.objects, this.props);
      this.lastTimestamp = ts;
    };

    render() {
      return (
        <canvas
          ref={this.setCanvasRef}
          width={this.props.width}
          height={this.props.height}
          style={this.props.style}
        />
      );
    }
  }

  AnimatedCanvas.propTypes = {
    animating: PropTypes.bool.isRequired,
    style: PropTypes.object,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    ...propTypes,
  };

  const VisibilityTrackingAnimation = ({
    style = {},
    animating = true,
    ...props
  }) => (
    <TrackVisibility partialVisibility style={style}>
      {({ isVisible }) => (
        <SizeTrackingContainer style={style}>
          <ContainerDimensions>
            {({ width, height }) => (
              <AnimatedCanvas
                animating={animating && isVisible}
                style={style}
                width={width}
                height={height}
                {...props}
              />
            )}
          </ContainerDimensions>
        </SizeTrackingContainer>
      )}
    </TrackVisibility>
  );

  VisibilityTrackingAnimation.propTypes = {
    style: PropTypes.object,
    animating: PropTypes.bool,
  };

  return VisibilityTrackingAnimation;
};
