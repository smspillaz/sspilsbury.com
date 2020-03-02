import React from 'react';
import { Helmet } from 'react-helmet';

import { Text } from 'rebass/styled-components';
import { Section } from 'react-landing-page';

import LoadingIndicator from 'components/LoadingIndicator';
import { ArticleContent } from 'components/ArticleContent';
import { PostPreview } from 'components/PostPreview';
import { PostPreviews } from 'containers/PostPreviews';

/* eslint-disable react/prefer-stateless-function */
export class PostsPage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {}

  render() {
    return (
      <article>
        <Helmet>
          <title>Posts</title>
          <meta name="description" content="Sam Spilsbury's Posts" />
        </Helmet>
        <ArticleContent>
          <Section width={1}>
            <PostPreviews.Consumer>
              {({ loading, error, posts }) => (
                <div>
                  {loading && <LoadingIndicator />}
                  {error && <Text>{error.msg}</Text>}
                  {!error &&
                    posts.map(post => (
                      <PostPreview
                        title={post.title}
                        subtitle={post.subtitle}
                        date={post.date}
                        likes={post.likes}
                        words={post.words}
                        url={post.url}
                      />
                    ))}
                </div>
              )}
            </PostPreviews.Consumer>
          </Section>
        </ArticleContent>
      </article>
    );
  }
}

PostsPage.propTypes = {};

export default PostsPage;
