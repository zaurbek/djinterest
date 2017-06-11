const express = require('express');
const app = express();

const path = require('path');
const request = require('request');
const queryString = require('query-string');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


app.use('/', express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/auth/twitter/callback', (req, res) => {
  if (req.query.error) {
    res.redirect('/');
  }
  const initialCode = req.query.code;

  const headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/json',
  };

  const options = {
    url: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    headers,
    form: {
      client_id: process.env.TWITTER_KEY,
      client_secret: process.env.TWITTER_SECRET,
      code: initialCode,
    },
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const accessToken = queryString
        .parse(body)
        .access_token;
      const options = {
        maxAge: 1000 * 60 * 60 * 24 * 180,
      };
      res.cookie('token', accessToken, options);
      res.redirect('/');
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log('====================================');
  console.log(`Server started at: ${PORT}`);
  console.log('====================================');
});




