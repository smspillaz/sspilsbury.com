import produce from 'immer';

import { loadPosts, loadPostsError, reducer } from '../slice';

/* eslint-disable default-case, no-param-reassign */
describe('postsReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: null,
      posts: [],
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(reducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadPosts action correctly', () => {
    const payload = {
      wordpress: {
        domain: 'smspillaz.wordpress.com',
        count: 2,
      },
    };
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = null;
      draft.posts = [];
    });
    expect(reducer(state, loadPosts(payload))).toEqual(expectedResult);
  });

  it('should handle the lostPostsError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = produce(state, draft => {
      draft.error = fixture;
      draft.loading = false;
    });

    expect(reducer(state, loadPostsError(new Error('Not found')))).toEqual(
      expectedResult,
    );
  });
});
