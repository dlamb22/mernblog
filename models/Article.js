const mongoose = require('mongoose');
const slugify = require('slugify');
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Forgot the title'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
      required: [true, 'Forgot the body'],
    },
    htmlBody: {
      type: String,
      required: true,
    },
    articleImg: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    tags: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ArticleSchema.pre('validate', async function () {
  if (this.title) {
    this.slug = await slugify(this.title, { lower: true, strict: true });
  }

  if (this.body) {
    this.htmlBody = await dompurify.sanitize(marked(this.body));
    this.body = this.htmlBody.replace(/<[^>]+>/g, '');
  }
});

module.exports = mongoose.model('Article', ArticleSchema);
