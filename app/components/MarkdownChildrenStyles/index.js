import styled from 'styled-components';
import { fontFamily, fontStyle, fontWeight } from 'styled-system';

export const MarkdownChildrenStyles = styled.div`
  ${fontFamily}

  p {
    ${fontFamily} ${fontWeight} ${fontStyle}
  }

  span {
    ${fontWeight} ${fontStyle}
  }

  a {
    text-decoration: none;
    color: darkgrey;

    :hover {
      color: lightgrey;
    }
  }
`;
