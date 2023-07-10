const express = require('express');
const axios = require('axios');
const parser = require('body-parser');
const { posts } = require('./src');
const { isAuthenticated } = require('./src/middlewares/auth');

const app = express();
const port = 3000;

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

const postsHandlers = posts({ axios });

app.post('/', isAuthenticated, postsHandlers.post);

app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});
