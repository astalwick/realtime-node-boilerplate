var _     = require('underscore')

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'REALTIME boilerplate', layout: false });
};