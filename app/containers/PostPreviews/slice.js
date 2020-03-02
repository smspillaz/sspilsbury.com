import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postPreviewsSlice = createSlice({
  name: 'postPreviews',
  initialState,
  reducers: {
    loadPosts(draft) {
      draft.loading = true;
      draft.error = null;
      draft.posts = [];
    },

    loadPostsSuccess(draft, action) {
      const posts = action.payload;
      draft.loading = false;
      draft.posts = posts;
    },

    loadPostsError(draft, action) {
      draft.error = {
        msg: action.payload.message,
      };
      draft.loading = false;
    },
  },
});

export const {
  loadPosts,
  loadPostsSuccess,
  loadPostsError,
} = postPreviewsSlice.actions;
export const { reducer } = postPreviewsSlice;
