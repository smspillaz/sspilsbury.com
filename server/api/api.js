const cors = require('cors');
const express = require('express');
const router = express.Router();

const wpcom = require('wpcom')();
const striptags = require('striptags');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const okResponse = payload => ({ status: 'ok', payload });
const errorResponse = msg => ({ status: 'error', msg });

const parseWordpressPost = wordpressPost => ({
  title: wordpressPost.title,
  /* Need to strip tags again after unescaping, since new tags
   * may have been added as a result. */
  subtitle: striptags(entities.decode(striptags(wordpressPost.excerpt))),
  date: new Date(wordpressPost.date).toISOString(),
  url: wordpressPost.URL,
  image: wordpressPost.featured_image,
  tags: Object.keys(wordpressPost.tags),
  likes: wordpressPost.like_count,
  words: striptags(wordpressPost.content).split(' ').length,
});

router.get('/post-previews', cors(), (req, res) => {
  const { wordpressDomain, wordpressCount } = req.query;

  return Promise.all([
    wpcom
      .site(wordpressDomain)
      .postsList({ number: wordpressCount })
      .then(response => response.posts.map(parseWordpressPost)),
  ])
    .then(results => results.reduce((r, acc) => acc.concat(r), []))
    .then(posts => posts.sort((a, b) => new Date(b.date) - new Date(a.date)))
    .then(posts => res.json(okResponse(posts)))
    .catch(e => res.status(500).json(errorResponse(String(e))));
});

module.exports = router;
