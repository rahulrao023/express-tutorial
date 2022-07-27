var express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');

var router = express.Router();

router.use(function(req,res,next) {
  console.log('middleware');
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/home/rahul/Desktop/rahul/express-tutorial/public/html/index.html');
  // res.render('index', { title: 'Express', users : [] });
});

router.post('/', function(req,res) {
  console.log(req.body.fname + req.body.lname + JSON.stringify(req.cookies));
  const user = {
    fname: res.req.body.fname,
    lname: res.req.body.lname
  };
  res.cookie("user", user);

  res.json({
    fname : req.body.fname,
    lname : req.body.lname,
    cookies : res.cookies
  });
});

router.get('/get_cookies', function(req,res) {
  res.json(req.cookies);
});

router.get('/all_users', async function(req, res) {
  let allUsers = await axios.get(`http://localhost:3000/all_users`)
                  .then((value) => {
                    console.log(value.data);
                    res.render('index', { title : 'Express', users : value.data });
                  })
                  .catch((err) => {
                    console.log('err');
                  });
});

router.get('/user', async function(req, res, next) {
  let user = await axios.get(`http://localhost:3000/all_users/${req.query.userId}`)
                    .then((value) => {
                      res.render('index', { title : 'Express', users : [value.data] });
                    })
                    .catch((err) => {
                      res.send(`<h2>Error!</h2>`);
                    });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'about', users : [] });
});

module.exports = router;
