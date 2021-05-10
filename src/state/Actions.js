import axios from 'axios';
import * as actionTypes from './ActionTypes';

export const getArticles = async (dispatch, pageNum, pageLimit) => {
  try {
    const res = await axios.get(
      `/api/articles?page=${pageNum}&limit=${pageLimit}`
    );
    dispatch({
      type: actionTypes.GET_ARTICLES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.ARTICLES_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const getArticle = async (dispatch, slug) => {
  try {
    const res = await axios.get(`/api/articles/${slug}`);
    dispatch({
      type: actionTypes.GET_ARTICLE,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.ARTICLES_ERROR,
      payload: console.log(err),
    });
  }
};

export const newArticle = async (dispatch, article) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const res = await axios.post('/api/articles/new', article, config);
    dispatch({
      type: actionTypes.NEW_ARTICLE,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.ARTICLES_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const editArticle = async (dispatch, id, updatedArticle) => {
  try {
    const res = await axios.put(`/api/articles/edit/${id}`, updatedArticle);
    dispatch({
      type: actionTypes.EDIT_ARTICLE,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.ARTICLES_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const getArticlesByTag = async (dispatch, tag, pageNum, pageLimit) => {
  try {
    const res = await axios.get(
      `/api/articles/tags/${tag}?page=${pageNum}&limit=${pageLimit}`
    );
    dispatch({
      type: actionTypes.GET_ARTICLES_BY_TAG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.ARTICLES_ERROR,
      payload: console.log(err),
    });
  }
};

export const deleteArticle = async (dispatch, id) => {
  try {
    await axios.delete(`/api/articles/delete/${id}`);
    dispatch({
      type: actionTypes.DELETE_ARTICLE,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.ARTICLES_ERROR,
      payload: err.response.data.error,
    });
  }
};
