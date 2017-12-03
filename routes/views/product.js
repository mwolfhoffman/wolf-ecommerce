var keystone = require('keystone');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'store';
  locals.filters = {
    product: req.params.product
  }
  locals.data = {
    products:[],
    product:{}
  }

view.on('init', function(next){
  var q = keystone.list('Product').model.findOne({
    slug: req.params.product
  });

  q.exec(function(err, result){
    if (err || result===null) {
      return next(err);
    }else{
       locals.data.product = result._doc;
      return next();
    }
  });
});


  // Render View
  view.render('product');
}