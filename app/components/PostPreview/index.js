import React from 'react';
import PropTypes from 'prop-types';

import { Box, Heading, Text } from 'rebass/styled-components';

import { Link } from 'components/Link';

export const PostPreview = ({
  title,
  subtitle = '',
  date,
  likes = 0,
  words = 0,
  url,
}) => (
  <Box width={[1]} p={2}>
    <Link color="black" hoverColor="grey" href={url}>
      <Heading fontSize={[2, 3, 4]}>{title}</Heading>
    </Link>
    <Text>{new Date(date).toLocaleDateString()}</Text>
    {subtitle && <Text color="grey">{subtitle}</Text>}
    <Text>{`Words: ${words}, Likes: ${likes}`}</Text>
  </Box>
);

PostPreview.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  date: PropTypes.string.isRequired,
  likes: PropTypes.number,
  words: PropTypes.number,
  url: PropTypes.string.isRequired,
};
