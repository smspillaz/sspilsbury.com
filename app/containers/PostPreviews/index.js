import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';

import { reducer, loadPosts } from './slice';
import {
  makeSelectPostsLoading,
  makeSelectPostsError,
  makeSelectPosts,
} from './selectors';
import saga from './saga';

export const PostPreviews = React.createContext();

const PostPreviewsFetcher = ({
  children,
  loadPostsAction,
  medium,
  wordpress,
  loading,
  error,
  posts,
}) => {
  useInjectReducer({ key: 'posts', reducer });
  useInjectSaga({ key: 'posts', saga });
  useEffect(() => {
    loadPostsAction({
      medium,
      wordpress,
    });
  }, [medium, wordpress]);

  return (
    <PostPreviews.Provider
      value={{
        loading,
        error,
        posts,
      }}
    >
      {children}
    </PostPreviews.Provider>
  );
};

PostPreviewsFetcher.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  loadPostsAction: PropTypes.func.isRequired,
  medium: PropTypes.shape({
    username: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }),
  wordpress: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectPostsLoading(),
  error: makeSelectPostsError(),
  posts: makeSelectPosts(),
});
const mapDispatchToProps = dispatch => ({
  loadPostsAction: ({ wordpress, medium }) =>
    dispatch(loadPosts({ wordpress, medium })),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const ConnectedPostPreviewsFetcher = withConnect(PostPreviewsFetcher);
ConnectedPostPreviewsFetcher.displayName = 'ConnectedPostPreviewsFetcher';

export default ConnectedPostPreviewsFetcher;
