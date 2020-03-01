import styled from 'styled-components';
import { color, fontSize, space, width } from 'styled-system';

export const Link = styled.a`
  ${color} ${space} ${width} ${fontSize}
  text-decoration: none;

  :hover {
    color: ${props => props.hoverColor};
  }
`;
