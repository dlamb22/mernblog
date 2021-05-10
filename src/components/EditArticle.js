import React, { useState, useReducer } from 'react';
import { editArticle } from '../state/Actions';
import Reducer from '../state/Reducer';
import { Link, useHistory } from 'react-router-dom';
import slugify from 'slugify';

const EditArticle = (props) => {
  const initialState = {
    articles: [],
    article: props.location.state,
    pagination: {},
    pageNum: 1,
    pageLimit: 5,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const [title, setTitle] = useState(state.article.title);
  const [body, setHtmlBody] = useState(state.article.htmlBody);

  const { _id } = state.article;
  const { slug } = state.article;
  const newSlug = slugify(title, { lower: true, strict: true });

  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedArticle = {
        title,
        body,
      };

      await editArticle(dispatch, _id, updatedArticle);

      history.push(`/articles/${newSlug}`);
    } catch (err) {
      console.log('new article error', err);
    }
  };

  const onBodyChangeHandler = (e) => {
    setHtmlBody(e.target.value);
  };

  return (
    <div className='my-5'>
      <div className='pt-2'>
        <form onSubmit={onSubmit}>
          <div className='form-floating mb-3 mt-5'>
            <input
              type='title'
              className='form-control'
              id='form-title'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor='form-title'>Article Title</label>
          </div>
          <div className='form-floating'>
            <textarea
              className='form-control'
              placeholder='Markdown'
              id='form-body'
              style={{ height: '250px' }}
              value={body}
              onChange={(e) => onBodyChangeHandler(e)}
            ></textarea>
            <label htmlFor='form-body'>Markdown Body</label>
          </div>
          <Link
            to={`/articles/${slug}`}
            className='btn btn-secondary mt-3 me-2'
          >
            Cancel
          </Link>
          <button type='submit' className='btn btn-primary mt-3'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
