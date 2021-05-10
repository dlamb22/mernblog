import React, { useReducer, useEffect, useState } from 'react';
import ArticleListItem from './ArticleListItem';
import Reducer from '../state/Reducer';
import { getArticles } from '../state/Actions';

const initialState = {
  loading: false,
  articles: [],
  article: {},
  pagination: [],
  pageNum: 1,
  pageLimit: 3,
};

const ArticleList = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const [endList, setEndList] = useState(false);
  const [endListMsg, setEndListMsg] = useState('');

  useEffect(() => {
    getArticles(dispatch, state.pageNum, state.pageLimit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showMore = () => {
    if (state.pagination.next) {
      getArticles(dispatch, state.pageNum + 1, state.pageLimit);
    } else {
      setEndList(true);
      setEndListMsg('End of Article List');
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

  const renderArticles = () => {
    return (
      <main className='container py-2'>
        {state.articles.map((article) => (
          <ArticleListItem article={article} key={article._id} />
        ))}
        <div className='d-grid gap-2 my-3'>
          <button
            className={`btn btn-light shadow-sm border view-more ${
              endList && 'end-of-list'
            }`}
            type='button'
            onClick={showMore}
            disabled={endList}
          >
            {endList ? endListMsg : 'View More Articles'}
          </button>
        </div>
      </main>
    );
  };

  return <>{state.loading ? isLoading() : renderArticles()}</>;
};

export default ArticleList;
