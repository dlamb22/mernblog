import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    history.push(`/articles/tags/${searchText.replace(/[^a-zA-Z]/g, '')}`);
    setOpen(!open);
    setSearchText('');
  };

  return (
    <nav className='navbar fixed-top navbar-light bg-light bg-gradient'>
      <div className='container container-nav'>
        <Link
          className='navbar-brand'
          to='/'
          onClick={() => open && setOpen(!open)}
        >
          <span className='fs-4 text-primary'>{'{ '}</span>
          webdevandchill
          <span className='fs-4 text-primary'>{' }'}</span>
        </Link>
        <div className='d-flex justify-content-end'>
          <Link to='/articles/new' onClick={() => open && setOpen(!open)}>
            <button type='button' className='btn btn-primary me-3'>
              New Article
            </button>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpen(!open)}
          >
            <span className='navbar-toggler-icon'></span>
          </button>
        </div>
        <div
          className={
            open ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'
          }
          id='navbarSupportedContent'
        >
          <form onSubmit={onSubmit} className='d-flex mt-3'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search Articles by 1 Keyword'
              aria-label='Search'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              required
            />
            <button className='btn btn-secondary' type='submit'>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
