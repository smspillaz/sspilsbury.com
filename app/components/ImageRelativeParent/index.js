import PropTypes from 'prop-types';

import styled from 'styled-components';
import { space, width } from 'styled-system';

export const ImageRelativeParent = styled.div`
  ${space} ${width}
  position: relative;
  height: ${props => props.expandedHeight};
  width: 100%;
  transition: ${props => (props.transition ? props.transition : 'none')};

  @media (min-width: 64em) {
    height: ${props => props.contractedHeight};
  }
`;

ImageRelativeParent.propTypes = {
  expandedHeight: PropTypes.string.isRequired,
  contractedHeight: PropTypes.string.isRequired,
  transition: PropTypes.string,
};
