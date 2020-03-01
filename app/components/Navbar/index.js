import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { Box, Text } from 'rebass/styled-components';

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: inline-block;
`;

const Toolbar = ({ children }) => (
  <Box
    p={1}
    style={{
      minHeight: '48px',
      color: 'black',
      bg: 'white',
      bgOpacity: 0.5,
      justifyContent: 'space-between',
      textAlign: 'right',
    }}
  >
    <NavLinks>{children}</NavLinks>
  </Box>
);

Toolbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export const Navbar = ({ items }) => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      zIndex: 1,
    }}
  >
    <Toolbar>
      {items.map(({ name, url }) => (
        <li style={{ float: 'left', margin: 5 }} key={url}>
          <NavLink
            to={url}
            key={url}
            href={url}
            style={{
              textDecoration: 'none',
            }}
          >
            <Text fontWeight="bold" color="black">
              {name}
            </Text>
          </NavLink>
        </li>
      ))}
    </Toolbar>
  </Box>
);

Navbar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
};
