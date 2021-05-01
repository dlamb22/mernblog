import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import Home from './components/Home';
import Article from './components/Article';
import EditArticle from './components/EditArticle';
import NewArticle from './components/NewArticle';
import Search from './components/Search';
import './App.css';

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className='container'>
        <Switch>
          <Route exact path='/articles/new' component={NewArticle} />
          <Route exact path='/articles/:slug' component={Article} />
          <Route exact path='/articles/edit/:id' component={EditArticle} />
          <Route exact path='/articles/tags/:tag' component={Search} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
