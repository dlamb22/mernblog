import * as actionTypes from './ActionTypes';

const Reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_ARTICLES:
      return {
        ...state,
        loading: false,
        articles: [...state.articles, ...action.payload.data],
        article: {},
        pagination: action.payload.pagination,
        pageNum: action.payload.page,
      };
    case actionTypes.GET_ARTICLE:
      return {
        ...state,
        loading: false,
        articles: [],
        article: action.payload,
        pagination: {},
        pageNum: 1,
      };
    case actionTypes.NEW_ARTICLE:
      return {
        ...state,
        loading: false,
        articles: [action.payload.data, ...state.articles],
      };
    case actionTypes.EDIT_ARTICLE:
      return {
        ...state,
        loading: false,
        article: action.payload,
      };
    case actionTypes.GET_ARTICLES_BY_TAG:
      return {
        ...state,
        loading: false,
        articles: action.payload.data,
        article: {},
        pagination: action.payload.pagination,
        pageNum: action.payload.page,
      };
    case actionTypes.DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article._id !== action.payload
        ),
      };
    case actionTypes.ARTICLES_ERROR:
      return {
        ...state,
        loading: false,
        error: [action.payload],
      };
    default:
      return state;
  }
};

export default Reducer;
