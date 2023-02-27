// routes/index.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers');

module.exports = () => {
  router.get('/', (req, res) => {
    res.send('Hello World!');
  });

  router.post('/chatgpt', controller.chatgpt);

  return router;
};

