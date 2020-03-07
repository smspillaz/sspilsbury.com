/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Heading, Text } from 'rebass/styled-components';
import { Hero, Section } from 'react-landing-page';

import { ArticleContent } from 'components/ArticleContent';
import { BackgroundAnimation } from 'components/BackgroundAnimation';
import LoadingIndicator from 'components/LoadingIndicator';
import { PostPreview } from 'components/PostPreview';
import { ProjectPreview } from 'components/ProjectPreview';
import { ProjectPreviewImageCarousel } from 'components/ProjectPreviewImageCarousel';
import { LayoutTypes } from 'components/ResponsiveOrderedLayoutChild';
import { VisibilityTrackedScrollDownIndicator } from 'components/VisibilityTrackedScrollDownIndicator';
import { PostPreviews } from 'containers/PostPreviews';
import messages from './messages';
import { projects } from '../../content/projects';

export default function HomePage({ animating = true }) {
  return (
    <article>
      <Helmet>
        <title>Sam Spilsbury</title>
        <meta name="description" content="Sam Spilsbury's Portfolio" />
      </Helmet>
      <Hero color="black" bgOpacity={0.0}>
        <BackgroundAnimation
          style={{
            margin: '0 0 0 0',
            zIndex: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
          animating={animating}
        />
        <ArticleContent style={{ textAlign: 'center' }}>
          <Heading fontSize={[5, 6, 7]}>
            <FormattedMessage {...messages.make} />
          </Heading>
          <Heading fontSize={[5, 6, 7]}>
            <FormattedMessage {...messages.imagination} />
          </Heading>
          <Heading fontSize={[5, 6, 7]}>
            <FormattedMessage {...messages.reality} />
          </Heading>
          <VisibilityTrackedScrollDownIndicator />
        </ArticleContent>
      </Hero>
      <ArticleContent>
        <Section width={1} heading={messages.posts.defaultMessage}>
          <PostPreviews.Consumer>
            {({ loading, error, posts }) => (
              <div>
                {loading && <LoadingIndicator />}
                {error && <Text>{error.msg}</Text>}
                {!error &&
                  posts
                    .slice(0, 5)
                    .map(post => (
                      <PostPreview
                        title={post.title}
                        subtitle={post.subtitle}
                        date={post.date}
                        likes={post.likes}
                        words={post.words}
                        url={post.url}
                        key={post.url}
                      />
                    ))}
              </div>
            )}
          </PostPreviews.Consumer>
        </Section>
        <Section width={1} heading={messages.projects.defaultMessage}>
          {projects
            .filter(({ featured }) => featured)
            .map((project, i) => (
              <ProjectPreview
                header={project.title}
                subtitle={project.subtitle}
                client={project.client}
                description={project.short}
                layout={i % 2 === 0 ? LayoutTypes.LEFT : LayoutTypes.RIGHT}
                url={project.url}
                key={project.key}
                renderContractedPreview={() => (
                  <ProjectPreviewImageCarousel
                    images={project.images}
                    imageStyleProps={project.imageStyleProps || {}}
                  />
                )}
              />
            ))}
        </Section>
      </ArticleContent>
    </article>
  );
}

HomePage.propTypes = {
  animating: PropTypes.bool,
};
