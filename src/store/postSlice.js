import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return response.data;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    singlePost: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchPosts.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.posts = action.payload;
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(fetchPostById.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchPostById.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.singlePost = action.payload;
    })
    .addCase(fetchPostById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
},
});

export default postSlice.reducer;