import React from 'react';
import ArticleList from './ArticleList';

const Home = () => {
  return (
    <div className='py-4'>
      <h1 className='welcome-h'>Welcome to the blog.</h1>
      <p className='welcome-p'>
        I'm Dominick. I am a web developer from the United States. This is my
        blog where I write tutorials and other useful knowledge I'd like to
        share with you.
      </p>
      <h3 className='latest-h'>Latest Articles</h3>
      <ArticleList />
    </div>
  );
};

export default Home;
