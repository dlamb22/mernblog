import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

const ArticleListItem = ({ article }) => {
  const { title, body, createdAt, slug, articleImg, tags } = article;

  const createdDate = Moment(createdAt).format('ll');

  return (
    <div className='card shadow-sm mt-3 mb-5 w-100'>
      <div className='row g-0'>
        <div className='col-md-4'>
          <img
            src={articleImg}
            alt='Article Img'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className='col-md-8'>
          <div className='card-body'>
            <h4 className='card-title mt-1 pb-1'>{title}</h4>
            <h6 className='card-subtitle mb-2 text-muted'>
              {tags.map((tag, id) => (
                <Link
                  to={`/articles/tags/${tag}`}
                  className='btn btn-light btn-sm me-1 main-tags'
                  key={id}
                >
                  #{tag}
                </Link>
              ))}
            </h6>
            <p className='card-text'>{body.substring(0, 250)}...</p>
            <p className='card-text d-flex justify-content-between align-items-end'>
              <small className='text-muted'>{createdDate}</small>
              <Link
                to={`/articles/${slug}`}
                className='btn btn-warning text-end'
              >
                Read More
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleListItem;
