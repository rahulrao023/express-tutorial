var express = require('express');
const axios = require('axios');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all_users', getData(), function (req,res) {
  res.json(res.allUsers);
});

router.get('/user', async function(req, res, next) {
  let user = await axios.get(`http://localhost:3000/all_users/${req.query.id}`)
                    .then((value) => {
                      res.json(value.data);
                    })
                    .catch((err) => {
                      res.send(`<h2>Error!</h2>`);
                    });
});

router.get('/paginate', getData(), pagination(), function(req,res) {
  res.json(res.paginatedUsers);
});

function getData() {
  return async (req,res,next) => {
    let users = [];
    await axios.get(`http://localhost:3000/all_users`)
          .then((value) => {
            users = value.data;
          })
          .catch((err) => {
            res.send(`<h2>Error!</h2>`);
          });
    res.allUsers = users;
    next();
  };
}

function pagination() {
  return (req,res,next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndx = (page-1) * limit;
    const endIndx = page * limit;

    if(startIndx >= res.allUsers.length) {
      res.send('No more data!'); 
    } else {
      res.paginatedUsers = res.allUsers.slice(startIndx, endIndx);
      next();
    }
  };
}

module.exports = router;
