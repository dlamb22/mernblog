import React, { useReducer, useState } from 'react';
import { newArticle } from '../state/Actions';
import Reducer from '../state/Reducer';
import { Link, useHistory } from 'react-router-dom';

const NewArticle = () => {
  const initialState = {
    articles: [],
    article: {},
    error: null,
    loading: true,
  };

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [articleImg, setArticleImg] = useState('');
  const [tags, setTags] = useState('');
  const [imgError, setImgError] = useState('');

  const history = useHistory();

  const fileSelectedHandler = (e) => {
    e.preventDefault();
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    const selected = e.target.files[0];

    if (selected && allowedTypes.includes(selected.type)) {
      setArticleImg(selected);
      setImgError('');
    } else {
      setArticleImg('');
      setImgError('Please select an image file (png or jpeg/jpg)');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const article = new FormData();
      article.append('title', title);
      article.append('body', body);
      article.append('articleImg', articleImg);
      article.append('tags', tags);

      await newArticle(dispatch, article);
      history.push('/');
    } catch (err) {
      console.log('new article error', err);
    }
  };

  return (
    <div className='pt-4 pb-5'>
      <h2>New Article</h2>
      <form onSubmit={onSubmit}>
        <div className='form-floating mb-3 mt-4'>
          <input
            name='title'
            type='text'
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
            name='body'
            type='text'
            className='form-control'
            placeholder='Markdown'
            id='form-body'
            style={{ height: '250px' }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <label htmlFor='form-body'>HTML & Markdown Body</label>
        </div>
        <div className='form-control mt-3 mb-2'>
          <label htmlFor='floatingUpload'>Article Image</label>
          <input
            name='articleImg'
            type='file'
            encType='multipart/form-data'
            id='floatingUpload'
            className='form-control'
            aria-describedby='inputGroupImgAddon'
            aria-label='Upload'
            placeholder='Choose Article Image'
            onChange={fileSelectedHandler}
          />
        </div>
        {imgError && <span className='error'>{imgError}</span>}
        <div className='form-floating mb-3 mt-4'>
          <input
            name='tags'
            type='text'
            className='form-control'
            id='form-tags'
            placeholder='Tags'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <label htmlFor='form-tags'>Searchable Tags Separated by Commas</label>
        </div>
        <Link to='/' className='btn btn-secondary mt-3 me-2'>
          Cancel
        </Link>
        <button type='submit' className='btn btn-primary mt-3'>
          Save
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
