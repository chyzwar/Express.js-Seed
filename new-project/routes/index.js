var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res) {
  res.render('home/index', { title: 'SearchMetrics API Worker' });
});

module.exports = router;
