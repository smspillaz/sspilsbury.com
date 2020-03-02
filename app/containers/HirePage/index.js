import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Flex, Heading, Image, Text } from 'rebass/styled-components';

import {
  CallToAction,
  Checklist,
  Feature,
  Hero,
  Section,
} from 'react-landing-page';

import { ArticleContent } from 'components/ArticleContent';
import { LogosAnimation } from 'components/LogosAnimation';
import { BackgroundAnimation } from 'components/BackgroundAnimation';
import { FormattedMarkdown } from 'components/FormattedMarkdown';
import { InvisibleBoxOnCondition } from 'components/InvisibleBoxOnCondition';
import {
  LayoutTypes,
  ResponsiveOrderedLayoutChild,
} from 'components/ResponsiveOrderedLayoutChild';
import { MarkdownChildrenStyles } from 'components/MarkdownChildrenStyles';
import { VisibilityTrackedScrollDownIndicator } from 'components/VisibilityTrackedScrollDownIndicator';
import { VisibilityTrackingTimeoutPager } from 'components/TimeoutPager';

import messages from './messages';

const translationAmount = (onLeft, onRight) => {
  if (onLeft) {
    return -20;
  }
  if (onRight) {
    return 20;
  }
  return 0;
};

const CarouselHeaderItem = ({ onLeft, onRight, children }) => (
  <Heading
    top={0}
    bottom={0}
    left={0}
    right={0}
    fontSize={[5, 6, 7]}
    style={{
      position: 'absolute',
      transform: `translate(${translationAmount(onLeft, onRight)}px, 0px)`,
      opacity: onRight || onLeft ? 0 : 1,
      filter: `${onRight || onLeft ? 'blur(8px)' : 'blur(0px)'}`,
      transition: 'all 1.5s ease-in-out',
      textAlign: 'center',
    }}
  >
    {children}
  </Heading>
);

CarouselHeaderItem.propTypes = {
  onLeft: PropTypes.bool.isRequired,
  onRight: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export const HeaderTextCarousel = ({ msgs }) => (
  <VisibilityTrackingTimeoutPager
    range={msgs.length}
    time={2000}
    render={({ index }) => (
      <Box sx={{ position: 'relative' }}>
        {msgs.map((message, i) => (
          <CarouselHeaderItem
            key={message.defaultMessage}
            onLeft={i < index}
            onRight={i > index}
          >
            <FormattedMessage {...message} />
          </CarouselHeaderItem>
        ))}
      </Box>
    )}
  />
);

HeaderTextCarousel.propTypes = {
  msgs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const TECHNOLOGY_IMAGE_URL_TEMPLATE =
  'https://s3.amazonaws.com/sspilsbury-com-images/logos/png/{technology}.png';

const repeatUntilAtLeastNElements = (elements, n) =>
  [...new Array(Math.floor(n / elements.length + 1))]
    .reduce(acc => acc.concat(elements), [])
    .slice(0, n);

const SkillsSection = ({
  headerMessage,
  descriptionMessages,
  technologies,
  animationDesktopOrder,
  animationMobileOrder,
  descriptionDesktopOrder,
  descriptionMobileOrder,
}) => (
  <Box width={[1]} mt={3}>
    <InvisibleBoxOnCondition condition="screen and (min-width: 64em)">
      <Heading fontSize={[2, 3, 4]} m="auto">
        <FormattedMessage {...headerMessage} />
      </Heading>
    </InvisibleBoxOnCondition>
    <Flex flexWrap="wrap" width={[1]}>
      <ResponsiveOrderedLayoutChild
        width={[1, 1, 1, 0.4]}
        desktopOrder={animationDesktopOrder}
        mobileOrder={animationMobileOrder}
      >
        <InvisibleBoxOnCondition condition="screen and (min-width: 64em)">
          <Flex
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            width={[1]}
          >
            {technologies.map(t => (
              <Image
                key={t}
                src={TECHNOLOGY_IMAGE_URL_TEMPLATE.replace('{technology}', t)}
                m={2}
                style={{
                  height: '5em',
                }}
              />
            ))}
          </Flex>
        </InvisibleBoxOnCondition>
        <InvisibleBoxOnCondition condition="screen and (max-width: 64em)">
          <LogosAnimation
            style={{
              width: '100%',
              height: '100%',
              minHeight: '320px',
              visible: false,
            }}
            orientation={animationDesktopOrder === LayoutTypes.LEFT ? -1 : 1}
            xOffset={animationDesktopOrder === LayoutTypes.LEFT ? -2 : 2}
            logoURLs={repeatUntilAtLeastNElements(
              technologies.map(t =>
                TECHNOLOGY_IMAGE_URL_TEMPLATE.replace('{technology}', t),
              ),
              10,
            )}
          />
        </InvisibleBoxOnCondition>
      </ResponsiveOrderedLayoutChild>
      <ResponsiveOrderedLayoutChild
        width={[1, 1, 1, 0.6]}
        desktopOrder={descriptionDesktopOrder}
        mobileOrder={descriptionMobileOrder}
      >
        <InvisibleBoxOnCondition condition="screen and (max-width: 64em)">
          <Heading fontSize={[2, 3, 4]}>
            <FormattedMessage {...headerMessage} />
          </Heading>
        </InvisibleBoxOnCondition>
        <MarkdownChildrenStyles>
          <ul>
            {descriptionMessages.map(m => (
              <li key={m.id}>
                <FormattedMarkdown {...m} />
              </li>
            ))}
          </ul>
        </MarkdownChildrenStyles>
      </ResponsiveOrderedLayoutChild>
    </Flex>
  </Box>
);

SkillsSection.propTypes = {
  headerMessage: PropTypes.object.isRequired,
  descriptionMessages: PropTypes.arrayOf(PropTypes.object).isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  animationDesktopOrder: PropTypes.number.isRequired,
  animationMobileOrder: PropTypes.number.isRequired,
  descriptionDesktopOrder: PropTypes.number.isRequired,
  descriptionMobileOrder: PropTypes.number.isRequired,
};

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
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
            <HeaderTextCarousel
              msgs={[
                messages.work,
                messages.hackathons,
                messages.consulting,
                messages.openSource,
              ]}
              style={{
                textAlign: 'center',
              }}
            />
            <VisibilityTrackedScrollDownIndicator />
          </div>
        </Hero>
        <ArticleContent>
          <Section width={1}>
            <CallToAction m={5} href="/contact" mt={3} bg="lightgrey">
              <FormattedMessage {...messages.getInTouch} />
            </CallToAction>
          </Section>
          <Section width={1} heading={messages.principles.defaultMessage}>
            <Text>
              <FormattedMessage {...messages.putMeInATeam} />
            </Text>
            <Flex flexWrap="wrap" justifyContent="center">
              <Feature
                icon="✅"
                description={messages.thingsGetDone.defaultMessage}
              >
                Action
              </Feature>
              <Feature
                icon="🚀"
                description={messages.projectGetsBetter.defaultMessage}
              >
                Quality
              </Feature>
              <Feature
                icon="☀️"
                description={messages.teamImproves.defaultMessage}
              >
                Learning
              </Feature>
            </Flex>
          </Section>
          <Section width={1} heading={messages.experience.defaultMessage}>
            <Box width={[1]}>
              <Box width={[1]} style={{ textAlign: 'center' }}>
                <Text>
                  <FormattedMessage {...messages.breadthAndDepth} />
                </Text>
              </Box>
              <br />
              <SkillsSection
                headerMessage={messages.ai}
                technologies={[
                  'js',
                  'python',
                  'pytorch',
                  'numpy',
                  'sql',
                  'luigi',
                ]}
                descriptionMessages={[
                  messages.machineLearningSkills,
                  messages.pythonDataSkills,
                  messages.dataPipelineSkills,
                ]}
                animationDesktopOrder={LayoutTypes.LEFT}
                animationMobileOrder={LayoutTypes.LEFT}
                descriptionDesktopOrder={LayoutTypes.RIGHT}
                descriptionMobileOrder={LayoutTypes.RIGHT}
              />
              <SkillsSection
                headerMessage={messages.systems}
                technologies={[
                  'c',
                  'cpp',
                  'java',
                  'gnome',
                  'linux',
                  'android',
                  'gtk',
                  'python',
                ]}
                descriptionMessages={[
                  messages.systemsProgrammingSkills,
                  messages.graphicsSkills,
                  messages.pythonSystemsSkills,
                ]}
                animationDesktopOrder={LayoutTypes.RIGHT}
                animationMobileOrder={LayoutTypes.LEFT}
                descriptionDesktopOrder={LayoutTypes.LEFT}
                descriptionMobileOrder={LayoutTypes.LEFT}
              />
              <SkillsSection
                headerMessage={messages.web}
                technologies={[
                  'react',
                  'js',
                  'aws',
                  'python',
                  'heroku',
                  'sql',
                  'webpack',
                  'express',
                  'docker',
                ]}
                descriptionMessages={[
                  messages.javascriptSkills,
                  messages.reactSkills,
                  messages.backendSkills,
                  messages.cloudSkills,
                ]}
                animationDesktopOrder={LayoutTypes.LEFT}
                animationMobileOrder={LayoutTypes.LEFT}
                descriptionDesktopOrder={LayoutTypes.RIGHT}
                descriptionMobileOrder={LayoutTypes.RIGHT}
              />
              <Box width={[1]} style={{ textAlign: 'center' }}>
                <Text>
                  <FormattedMarkdown {...messages.whateverTheDomain} />
                </Text>
              </Box>
            </Box>
          </Section>
          <Section width={1} heading={messages.approach.defaultMessage}>
            <Text>
              <FormattedMarkdown {...messages.notJustABagOfTech} />
            </Text>
            <MarkdownChildrenStyles>
              <Checklist>
                <FormattedMarkdown {...messages.usesGitProperly} />
                <FormattedMarkdown {...messages.debuggingIntuition} />
                <FormattedMarkdown {...messages.experienceAlgorithms} />
                <FormattedMarkdown {...messages.profilingAndDebuggingTools} />
                <FormattedMarkdown {...messages.multidisciplinaryExperience} />
              </Checklist>
            </MarkdownChildrenStyles>
            <Text>
              <FormattedMarkdown {...messages.relyOnMe} />
            </Text>
          </Section>
          <Section width={1} heading={messages.talk.defaultMessage}>
            <CallToAction href="/contact" mt={3} bg="lightgrey">
              <FormattedMessage {...messages.getInTouch} />
            </CallToAction>
            <CallToAction
              mt={3}
              href="https://sspilsbury-com-images.s3.amazonaws.com/pdf/sspilsbury-resume.pdf"
              bg="lightgrey"
            >
              CV
            </CallToAction>
          </Section>
        </ArticleContent>
      </article>
    );
  }
}

HomePage.propTypes = {};

export default HomePage;
