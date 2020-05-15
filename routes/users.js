var express = require('express');
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
      user.comparePassword(password, function(error, isMatch) {
        if (isMatch) {

          res.json({
            id: user.id
          });
        } else {
          res.status(401).json({
            message: 'Unauthenticated'
          });
        }
      });
    })
    .catch(function(error) {
      res.status(404).json({
        message: 'User Not found'
      })
    });
});

module.exports = router;
