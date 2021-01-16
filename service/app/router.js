'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
//配置總路由
module.exports = app => {

  require('./router/default')(app)
  require('./router/admin')(app)
};

