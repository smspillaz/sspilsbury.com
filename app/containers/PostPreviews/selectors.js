/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './slice';

const selectPosts = state => state.posts || initialState;

const selectRouter = state => state.router;

const makeSelectPostsLoading = () =>
  createSelector(selectPosts, postsState => postsState.loading);

const makeSelectPostsError = () =>
  createSelector(selectPosts, postsState => postsState.error);

const makeSelectPosts = () =>
  createSelector(selectPosts, postsState => postsState.posts);

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState => routerState.location);

export {
  selectPosts,
  makeSelectPostsLoading,
  makeSelectPostsError,
  makeSelectPosts,
  makeSelectLocation,
};
