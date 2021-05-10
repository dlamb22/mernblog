import React, { useReducer, useEffect } from 'react';
import Reducer from '../state/Reducer';
import { getArticle, deleteArticle } from '../state/Actions';
import { Link, useHistory } from 'react-router-dom';
import Moment from 'moment';

const Article = (props) => {
  const initialState = {
    articles: [],
    article: {},
    pagination: {},
    pageNum: 1,
    pageLimit: 5,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const { title, htmlBody, createdAt, _id, articleImg } = state.article;
  const body = { __html: htmlBody };

  useEffect(() => {
    const slug = props.match.params.slug;
    getArticle(dispatch, slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createdDate = Moment(createdAt).format('ll');

  const history = useHistory();

  const onDelete = async () => {
    try {
      await deleteArticle(dispatch, _id);
      history.push('/');
    } catch (err) {
      console.log('Error deleting article', err);
    }
  };

  const isLoading = () => {
    return (
      <div className='d-flex justify-content-center py-5'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  };

  const renderArticle = () => {
    return (
      <main className='container py-3'>
        <h2 className='card-title my-3'>{title}</h2>
        <h6 className='card-subtitle mb-2 text-muted'>
          {state.article.tags.map((tag, id) => (
            <Link to={`/articles/tags/${tag}`} className='btn btn-light btn-sm me-1' key={id}>
              #{tag}
            </Link>
          ))}
        </h6>
        <img
          src={articleImg.secure_url}
          alt='Article Img'
          style={{ width: '100%', height: '350px' }}
        />
        <p className='card-text my-5' dangerouslySetInnerHTML={body} />
        <div className='card-text d-flex justify-content-end align-items-end'>
          <small className='text-muted me-auto'>{createdDate}</small>
          <Link to='/' className='btn btn-outline-secondary mx-1' role='button'>
            Back
          </Link>
          <Link
            to={{ pathname: `/articles/edit/${_id}`, state: state.article }}
            className='btn btn-outline-primary mx-1'
            role='button'
          >
            Edit
          </Link>
          <button onClick={onDelete} className='btn btn-outline-danger ms-1'>
            Delete
          </button>
        </div>
      </main>
    );
  };

  return <>{state.loading ? isLoading() : renderArticle()}</>;
};

export default Article;
