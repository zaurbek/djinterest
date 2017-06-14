const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const PORT = process.env.PORT || 8080;

const passport = require('passport');
const passportTwitter = require('passport-twitter');
const TwitterStrategy = passportTwitter.Strategy;

passport.use(new TwitterStrategy({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  callbackURL: 'http://127.0.0.1:8080/login/twitter/return',
}, (token, tokenSecret, profile, cb) => cb(null, profile)));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.use('/', express.static(`${__dirname}/public`));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSession({ secret: ':CWPE2rcom4kms09c54gmalsdfCFAipoamdaismcpqw', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/user_data', (req, res) => {
  if (req.user === undefined) {
    res.json({ error: 'User is not logged in' });
  } else {
    res.send(req.user);
  }
});

app.get('/login/twitter', passport.authenticate('twitter'));

app.get('/login/twitter/return', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`server started at: ${PORT}`);
});
