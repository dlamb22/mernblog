const express = require('express');
const router = express.Router();

const {
  getAllArticles,
  showArticle,
  newArticle,
  getArticlesByTag,
  editArticle,
  deleteArticle,
} = require('./../controllers/articles');

router.get('/api/articles', getAllArticles);
router.get('/api/articles/:slug', showArticle);
router.get('/api/articles/tags/:tag', getArticlesByTag);
router.post('/api/articles/new', newArticle);
router.put('/api/articles/edit/:id', editArticle);
router.delete('/api/articles/delete/:id', deleteArticle);

module.exports = router;
