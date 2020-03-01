import React from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';

import styled from 'styled-components';

const SizeTrackingContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const makeEmscriptenLoaderProps = ({
  fileMappings,
  canvas,
  reportStatus,
  onRuntimeInitialized,
  ...moduleProps
}) => ({
  locateFile(file) {
    return fileMappings[file];
  },

  printErr(...args) {
    // eslint-disable-next-line
    console.error([...args].join(' '));
  },

  print(...args) {
    // eslint-disable-next-line
    console.log([...args].join(' '));
  },

  canvas,

  totalDependencies: 0,
  monitorRunDependencies(left) {
    this.totalDependencies = Math.max(this.totalDependencies, left);

    if (left) {
      reportStatus(
        `Downloading... ${this.totalDependencies - left}/${
          this.totalDependencies
        }`,
      );
    } else {
      reportStatus('Download complete');
    }
  },
  onRuntimeInitialized() {
    onRuntimeInitialized(this);
  },
  ...moduleProps,
});

export class EmscriptenView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.canvas = null;
    this.module = null;
  }

  setCanvasRef = ref => {
    this.canvas = ref;

    if (ref) {
      const {
        moduleClass,
        fileMappings,
        onRuntimeInitialized,
        ...moduleProps
      } = this.props;

      this.module = moduleClass(
        makeEmscriptenLoaderProps({
          fileMappings,
          onRuntimeInitialized,
          reportStatus: msg => console.log(msg),
          canvas: ref,
          ...moduleProps,
        }),
      );
    } else {
      this.module = null;
    }
  };

  render() {
    const { style = {} } = this.props;

    return (
      <SizeTrackingContainer>
        <ContainerDimensions>
          {({ width, height }) => (
            <canvas
              ref={this.setCanvasRef}
              width={width}
              height={height}
              style={style}
            />
          )}
        </ContainerDimensions>
      </SizeTrackingContainer>
    );
  }
}

EmscriptenView.propTypes = {
  moduleClass: PropTypes.func.isRequired,
  fileMappings: PropTypes.object.isRequired,
  onRuntimeInitialized: PropTypes.func.isRequired,
  style: PropTypes.object,
};
