/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { loadPosts, loadPostsSuccess, loadPostsError } from '../slice';

import postsData, { getPosts } from '../saga';

const postsPayload = {
  payload: {
    wordpress: {
      domain: 'smspillaz.wordpress.com',
      count: 2,
    },
  },
};

/* eslint-disable redux-saga/yield-effects */
describe('getPosts Saga', () => {
  let getPostsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getPostsGenerator = getPosts(postsPayload);

    const callDescriptor = getPostsGenerator.next(postsPayload).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the loadPostsSuccess action if it requests the data successfully', () => {
    const putDescriptor = getPostsGenerator.next(postsPayload).value;
    expect(putDescriptor).toEqual(put(loadPostsSuccess(postsPayload.payload)));
  });

  it('should call the loadPostsError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getPostsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(loadPostsError(response)));
  });
});

describe('postsDataSaga Saga', () => {
  const postsDataSaga = postsData();

  it('should start task to watch for loadPosts action', () => {
    const takeLatestDescriptor = postsDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(loadPosts.type, getPosts));
  });
});
