const express = require('express');
const Article = require('../models/Article');
const slugify = require('slugify');
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

// @desc  Get all articles
// @route GET /api/articles
//@access Public
exports.getAllArticles = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < (await Article.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    const articles = await Article.find()
      .limit(limit)
      .skip(startIndex)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: articles.length,
      pagination: results,
      page: page,
      data: articles,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc  Show an article
// @route GET /api/articles/:id
//@access Public
exports.showArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    return res.status(200).json({
      success: true,
      data: article,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Article not found',
    });
  }
};

// @desc  Add an article
// @route POST /api/articles/new
//@access Private
exports.newArticle = async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({
        msg: 'No file was uploaded',
      });
    }

    const file = req.files.articleImg;

    const img = `${Math.random().toString(36).substr(2, 11)}${file.name
      .trim()
      .replace(/\.[^/.]+$/, '')}`;

    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
      secure: true,
      folder: 'uploads',
      public_id: img,
    });

    fs.unlink(file.tempFilePath, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: 'Image not deleted',
        });
      }
    });

    const articleImg = {
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
    };

    const { title, body, tags } = req.body;

    const article = await Article.create({
      title,
      body,
      articleImg,
      tags: tags.split(', '),
    });

    return res.status(201).json({
      success: true,
      data: article,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Article not created',
      });
    }
  }
};

// @desc  Edit an article
// @route POST /api/articles/edit/:id
//@access Private
exports.editArticle = async (req, res) => {
  try {
    //await Article.findById(req.params.id);
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        error: 'Missing fields',
      });
    }

    const slug = await slugify(title, { lower: true, strict: true });
    const htmlBody = await dompurify.sanitize(marked(body));
    const newBody = htmlBody.replace(/<[^>]+>/g, '');

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { title, body: newBody, htmlBody, slug },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedArticle,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Article not found',
    });
  }
};

// @desc  Search for articles by tag
// @route GET /api/articles/tags/:tag
//@access Private
exports.getArticlesByTag = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < (await Article.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  const tag = req.params.tag.replace(/[^a-zA-Z]/g, '');

  try {
    const articles = await Article.find({
      tags: new RegExp(tag, 'i'),
    })
      .limit(limit)
      .skip(startIndex)
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      success: true,
      count: articles.length,
      pagination: results,
      page: page,
      data: articles,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Articles not found',
    });
  }
};

// @desc  Delete an article
// @route DELETE /api/articles/delete/:id
//@access Private
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    const public_id = article.articleImg.public_id;

    await article.remove();

    await cloudinary.uploader.destroy(public_id, (err, result) => {
      if (err) throw err;
    });

    return res.status(200).json({
      success: true,
      data: 'Article has been removed',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'No Article Found',
    });
  }
};
