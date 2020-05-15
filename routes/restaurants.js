var express = require('express');
var router = express.Router();
var Restaurant = require('../schemas/restaurant');

/* GET restaurants listing. */
router.get('/', function(req, res, next) {
  const query = req.query.name ? {
    name: {
      $regex: '^' + req.query.name,
      $options: 'i'
    }
  } : undefined;
  Restaurant.count(query)
    .then(function(count) {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const skip = req.query.page ? (parseInt(req.query.page) - 1) * limit : 1;
      return Restaurant.find(query)
        .sort('name')
        .skip(skip)
        .limit(limit)
        .populate('schedule')
        .then(function(restaurants) {
          return {
            data: restaurants,
            total: count,
            totalPages: Math.ceil(count / limit),
            limit,
            page: parseInt(req.query.page)
          };
        });
    })
    .then(function(result) {
      res.json(result);
    })
    .catch(next);
});

module.exports = router;
