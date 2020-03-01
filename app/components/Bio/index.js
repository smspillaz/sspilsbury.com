import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { Contributor } from 'react-landing-page';
import { Box, Flex } from 'rebass';

const ResponsiveFlex = styled(Flex)`
  flex-direction: column;

  @media (min-width: 64em) {
    flex-direction: ${props => props.direction};
  }
`;

ResponsiveFlex.propTypes = {
  direction: PropTypes.string.isRequired,
};

export const Bio = ({
  photo,
  name,
  title,
  children,
  renderContributorChildren = null,
}) => (
  <ResponsiveFlex width={[1]} mt={3} direction="row">
    <Box width={[1, 1, 1, 1]} m={1} alignSelf="center">
      <Contributor avatar={photo} fullName={name} title={title}>
        {renderContributorChildren ? (
          renderContributorChildren(photo, name, title)
        ) : (
          <span />
        )}
      </Contributor>
    </Box>
    <Box width={[1, 1, 1, 1]} m={1}>
      {children}
    </Box>
  </ResponsiveFlex>
);

Bio.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  renderContributorChildren: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
