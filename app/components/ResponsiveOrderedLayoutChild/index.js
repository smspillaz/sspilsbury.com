import PropTypes from 'prop-types';

import styled from 'styled-components';
import { space, width } from 'styled-system';

export const LayoutTypes = {
  LEFT: 0,
  RIGHT: 1,
};

export const ResponsiveOrderedLayoutChild = styled.div`
  ${space}
  ${width}
  order: ${props => props.mobileOrder};
  transition: ${props => (props.transition ? props.transition : 'none')};

  @media (min-width: 64em) {
    order: ${props => props.desktopOrder};
  }
`;

ResponsiveOrderedLayoutChild.propTypes = {
  desktopOrder: PropTypes.number.isRequired,
  mobileOrder: PropTypes.number.isRequired,
  transition: PropTypes.string,
};
