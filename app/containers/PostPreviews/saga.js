/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { loadPosts, loadPostsError, loadPostsSuccess } from './slice';

/**
 * Blog posts request/response handler
 */
export function* getPosts({ payload: { wordpress } }) {
  const requestURL = `${process.env.API_HOST ||
    ''}/api/post-previews?wordpressDomain=${wordpress.domain}&wordpressCount=${
    wordpress.count
  }`;

  try {
    // Call our request helper (see 'utils/request')
    const { payload } = yield call(request, requestURL);
    yield put(loadPostsSuccess(payload));
  } catch (err) {
    console.error(err);
    yield put(loadPostsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* postsData() {
  // Watches for loadPosts actions and calls getPosts when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(loadPosts.type, getPosts);
}
