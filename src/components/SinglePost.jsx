import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById } from '../store/postSlice'

const SinglePost = () => {
    const { id } = useParams(); //хук который достает айди поста из урлы
    const dispatch = useDispatch();
    const { singlePost, status } = useSelector((state) => state.posts);
  
    useEffect(() => {
      dispatch(fetchPostById(id)); //когда компонет загрузится - отправляем запрос на получение поста с этим  id
    }, [dispatch, id]);
  
    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error loading post.</p>;
  
    return (
      <div>
        {singlePost && (
          <>
            <h1>{singlePost.title}</h1>
            <p>{singlePost.body}</p>
          </>
        )}
      </div>
    );
  };
  
  export default SinglePost;