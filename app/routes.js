'use strict';
module.exports = function(app) {
  const controller = require('./controllers/controller');

   app.route('/feed')
    .get(controller.getFeed);
}