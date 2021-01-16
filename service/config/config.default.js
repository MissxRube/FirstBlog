/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1609336941316_5396';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // //跨域配置
  // config.security={
  //   scrf:{
  //     enable:false,
  //   },
  //   //白名單
  //   domainWhiteList:['*']
  // }
  // //能允許那葛進行跨域
  // config.cors = {
  //   //域名
  //   origin:'http://localhost:3000',
  //   //允許cookie跨域(有安全性的問題)
  //   credentials:true,
  //   //請求
  //   allowMethods:'GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS,UPDATE'
  // }
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    // origin: '*',
    credentials: true,  // 允许Cook可以跨域
    origin: 'http://localhost:3000', //只允许这个域进行访问接口
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  return {
    ...config,
    ...userConfig,
  };
};
