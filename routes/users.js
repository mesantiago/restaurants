var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config.json');
var User = require('../schemas/user');
var router = express.Router();

/* POST user creation. */
router.post('/', function(req, res, next) {
  User.create(req.body)
    .then(function({ id, email, password }) {
      res.json({ id, email });
    })
    .catch(next);
});

/* POST user login. */
router.post('/login', function(req, res, next) {
  var { email, password } = req.body;
  User.findOne({ email })
    .then(function(user) {
      if (user) {
        user.comparePassword(password, function(error, isMatch) {
          if (isMatch) {
            const token = jwt.sign({ user }, config.jwtSecret, {
              expiresIn: '24h'
            });

            res.json({
              id: user.id,
              token
            });
          } else {
            res.status(401).json({
              message: 'Unauthenticated'
            });
          }
        });
      } else {
        res.status(404).json({
          message: 'User Not found'
        })
      }
    })
    .catch(next);
});

module.exports = router;
