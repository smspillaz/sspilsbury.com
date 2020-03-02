import {
  selectPosts,
  makeSelectPostsLoading,
  makeSelectPostsError,
  makeSelectPosts,
  makeSelectLocation,
} from '../selectors';

describe('selectPosts', () => {
  it('should select the posts state', () => {
    const postsState = {};
    const mockedState = {
      posts: postsState,
    };
    expect(selectPosts(mockedState)).toEqual(postsState);
  });
});

describe('makeSelectPostsLoading', () => {
  const loadingSelector = makeSelectPostsLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = {
      posts: {
        loading,
      },
    };
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectPostsError', () => {
  const errorSelector = makeSelectPostsError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = {
      posts: {
        error,
      },
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectPosts', () => {
  const postsSelector = makeSelectPosts();
  it('should select the posts', () => {
    const posts = [];
    const mockedState = {
      posts: {
        posts,
      },
    };
    expect(postsSelector(mockedState)).toEqual(posts);
  });
});

describe('makeSelectLocation', () => {
  it('should select the location', () => {
    const locationStateSelector = makeSelectLocation();
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      router,
    };
    expect(locationStateSelector(mockedState)).toEqual(router.location);
  });
});
