// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchPosts } from '../store/postSlice'; 
import { Link } from 'react-router-dom';

const PostList = () => {
  const dispatch = useDispatch(); 
  const { posts, status, error } = useSelector((state) => state.posts); 
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts()); 
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;