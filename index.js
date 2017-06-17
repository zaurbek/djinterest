// ============================================================
// Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const PORT = process.env.PORT || 8080;


// ============================================================
// .env
require('dotenv').config();


// ============================================================
// path
const path = require('path');


// ============================================================
// DB
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.REMOTE_DB);

const Pin = require('./src/model/Pin');


// ============================================================
// Passport.js
const passport = require('passport');
const passportTwitter = require('passport-twitter');
const TwitterStrategy = passportTwitter.Strategy;

passport.use(new TwitterStrategy({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  callbackURL: 'https://djinterest.herokuapp.com/login/twitter/return',
}, (token, tokenSecret, profile, cb) => cb(null, profile)));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});


// ============================================================
app.use('/', express.static(`${__dirname}/public`));
app.use('/user', express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSession({ secret: ':CWPE2rcom4kms09c54gmalsdfCFAipoamdaismcpqw', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// ============================================================
// routes
app.post('/api/djin/like', (req,res)=>{
  Pin.findOne({id: req.body.id}).then(singleNode=>{
    if (singleNode.likes.indexOf(req.body.person)<0) {
      Pin.findOneAndUpdate({id: req.body.id},{$push:{likes: req.body.person }},{ returnNewDocument: true },(updatedNode)=>{
        console.log('if already wasn"t present');
        console.log('====================================');
        console.log(updatedNode);
        console.log('====================================');
        res.send(updatedNode);
      })
    } else {
      Pin.findOneAndUpdate({id: req.body.id}, { $pullAll: { likes: [req.body.person] } }, { returnNewDocument: true }, (updatedNode)=>{
        console.log('if already was present');
        console.log('====================================');
        console.log(updatedNode);
        console.log('====================================');
        res.send(updatedNode);
      })
    } 
  })
})

app.post('/api/djin/pin', (req,res)=>{
  Pin.findOne({id: req.body.id}).then(singleNode=>{
    if (singleNode.pins.indexOf(req.body.person)<0) {
      Pin.findOneAndUpdate({id: req.body.id},{$push:{pins: req.body.person }},{ returnNewDocument: true },(updatedNode)=>{
        console.log('if already wasn"t present');
        console.log('====================================');
        console.log(updatedNode);
        console.log('====================================');
        res.send(updatedNode);
      })
    } else {
      Pin.findOneAndUpdate({id: req.body.id}, { $pullAll: { pins: [req.body.person] } }, { returnNewDocument: true }, (updatedNode)=>{
        console.log('if already was present');
        console.log('====================================');
        console.log(updatedNode);
        console.log('====================================');
        res.send(updatedNode);
      })
    } 
  })
})


app.post('/api/djin/delete', (req,res)=> {
  Pin.remove({id:req.body.id+'asdasd'},(err,result)=>{
    if (err) {
      console.log(err);
    }
    res.send(result);
  })
})

app.get('/api/djin/all', (req, res) => {
  Pin.find({}).limit(200).sort({_id:-1}).then((completeBoard) => {
      res.send(completeBoard);
    });
})

app.get('/api/djin/board', (req, res) => {
  Pin.find({ $or: [{ creatorId: req.query.id },
                  { pins: { $in: [req.query.id] } }] 
             }).then((authorsBoard) => {
      console.log(authorsBoard);
      res.send(authorsBoard);
    });
});

app.post('/api/djin/submit', (req, res) => {
  console.log(req.body);
  const newPin = new Pin(req.body);
  newPin.save(() => {
    Pin.find({ $or: [{ creatorId: req.body.creatorId },
                     { pins: { $in: [req.body.creatorId] } }
                    ]}).then((authorsBoard) => {
      console.log(authorsBoard);
      res.send(authorsBoard);
    });
  });
});

app.get('/api/user_data', (req, res) => {
  if (req.user === undefined) {
    res.json({ error: 'User is not logged in' });
  } else {
    res.send(req.user);
  }
});

// ============================================================
// auth routes
app.get('/login/twitter', passport.authenticate('twitter'));

app.get('/login/twitter/return', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});


// ============================================================
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`server started at: ${PORT}`);
});
