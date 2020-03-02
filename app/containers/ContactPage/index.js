import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Flex } from 'rebass/styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { Heading, Hero, Section } from 'react-landing-page';

import { BackgroundAnimation } from 'components/BackgroundAnimation';
import { Link } from 'components/Link';
import { VisibilityTrackedScrollDownIndicator } from 'components/VisibilityTrackedScrollDownIndicator';

import messages from './messages';

const ContactMethod = ({ icon, text, link }) => (
  <Flex alignItems="left" justifyContent="left">
    <Box flexBasis="auto" mr={4} ml={4}>
      <FontAwesomeIcon icon={icon} size="4x" />
    </Box>
    <Flex
      flexBasis="auto"
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Link href={link} color="black" hoverColor="grey" fontWeight="strong">
        {text}
      </Link>
    </Flex>
  </Flex>
);

ContactMethod.propTypes = {
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const CONTACT_METHODS = [
  ['email', faEnvelope, 'smspillaz@gmail.com', 'mailto:smspillaz@gmail.com'],
  [
    'linkedin',
    faLinkedin,
    'tsspilsbury',
    'https://www.linkedin.com/in/tsspilsbury/',
  ],
  ['github', faGithub, 'smspillaz', 'https://github.com/smspillaz'],
];

/* eslint-disable react/prefer-stateless-function */
export class ContactPage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {}

  render() {
    return (
      <article>
        <Hero color="black" bgOpacity={0.0}>
          <BackgroundAnimation
            style={{
              margin: '0 0 0 0',
              zIndex: 0,
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
          />
          <div
            style={{
              height: '100%',
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            <Heading fontSize={[5, 6, 7]}>
              <FormattedMessage {...messages.talk} />
            </Heading>
            <VisibilityTrackedScrollDownIndicator />
          </div>
        </Hero>
        <div
          style={{
            maxWidth: 'calc(1024px + 16px * 2)',
            margin: 'auto',
          }}
        >
          <Section width={1}>
            <Flex
              alignItems="left"
              justifyContent="left"
              flexDirection="column"
              width={[1]}
            >
              {CONTACT_METHODS.map(([key, icon, text, link]) => (
                <ContactMethod key={key} icon={icon} text={text} link={link} />
              ))}
            </Flex>
          </Section>
        </div>
      </article>
    );
  }
}

ContactPage.propTypes = {};

export default ContactPage;
