import PropTypes from 'prop-types';

import styled from 'styled-components';
import { space, width } from 'styled-system';

export const InvisibleBoxOnCondition = styled.div`
  ${space} ${width}
  display: flex;

  @media ${props => props.condition} {
    display: none;
  }
`;

InvisibleBoxOnCondition.propTypes = {
  condition: PropTypes.string.isRequired,
};
