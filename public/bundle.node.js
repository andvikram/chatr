/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server_app/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server_app sync recursive ^.*\\/server_app\\/routes\\/v1\\/routes\\.js$":
/*!******************************************************************!*\
  !*** ./server_app sync ^.*\/server_app\/routes\/v1\/routes\.js$ ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./server_app sync recursive ^.*\\\\/server_app\\\\/routes\\\\/v1\\\\/routes\\\\.js$\";\n\n//# sourceURL=webpack:///./server_app_sync_^.*\\/server_app\\/routes\\/v1\\/routes\\.js$?");

/***/ }),

/***/ "./server_app/server.js":
/*!******************************!*\
  !*** ./server_app/server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nmodule.exports = function (appServer) {\n  var app = appServer;\n  var server;\n\n  function init(config) {\n    var routes = __webpack_require__(\"./server_app sync recursive ^.*\\\\/server_app\\\\/routes\\\\/v1\\\\/routes\\\\.js$\")(__basedir + \"/server_app/routes/v1/routes.js\"); // Set the app\n\n\n    var baseURL = \"\".concat(config.scheme, \"://\").concat(config.host, \":\").concat(config.port);\n    app.set('env', \"development\" || false);\n    app.set('host', config.host);\n    app.set('port', config.port);\n    app.set('baseURL', baseURL);\n    var mConf = config.database.mongo;\n    app.set('dbURI', \"\".concat(mConf.scheme, \"://\").concat(mConf.host, \":\").concat(mConf.port, \"/\").concat(mConf.name)); // Add middleware to parse the json\n\n    app.use(bodyParser.json());\n    app.use(bodyParser.urlencoded({\n      extended: false\n    })); // Add routes\n\n    app.use('/api/', routes);\n  }\n\n  function start() {\n    dbConnect();\n  }\n\n  function dbConnect() {\n    var uri = app.get('dbURI');\n    mongoose.connect(uri, {\n      useNewUrlParser: true,\n      useCreateIndex: true,\n      useUnifiedTopology: true\n    }).then(function () {\n      console.log(\"\\nConnected to MongoDB on:\", uri, \"...\");\n      startServer();\n    }).catch(function (err) {\n      console.log(\"\\nError connecting to MongoDB:\", err);\n      process.exit(1);\n    });\n  }\n\n  function startServer() {\n    var host = app.get('host'),\n        port = app.get('port');\n    server = app.listen({\n      host: host,\n      port: port\n    }, function () {\n      console.log(\"\\n!!**!!\\n\\nChatr server listening on - \".concat(app.get('baseURL'), \"\\n\\nCTRL+C to stop\\n\\n\"));\n    });\n    process.on('SIGINT', stopServer);\n    process.on('SIGHUP', stopServer);\n    process.on('SIGTERM', stopServer);\n  }\n\n  function stopServer() {\n    return _stopServer.apply(this, arguments);\n  }\n\n  function _stopServer() {\n    _stopServer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n      var timeoutId;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              console.log(\"\\nStopping server ...\");\n              timeoutId = setTimeout(function () {\n                console.error('Stopped forcefully, not all connection was closed');\n                process.exit(1);\n              }, 5000);\n              _context.prev = 2;\n              _context.next = 5;\n              return mongoose.connection.close(false, function () {\n                console.log('MongoDB connection closed');\n              });\n\n            case 5:\n              _context.next = 7;\n              return server.close(function () {\n                console.log('Http server stopped');\n              });\n\n            case 7:\n              clearTimeout(timeoutId);\n              console.log(\"\\n ... stopped server\");\n              process.exit(0);\n              _context.next = 16;\n              break;\n\n            case 12:\n              _context.prev = 12;\n              _context.t0 = _context[\"catch\"](2);\n              console.error(_context.t0, '... error during stop');\n              process.exit(1);\n\n            case 16:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, null, [[2, 12]]);\n    }));\n    return _stopServer.apply(this, arguments);\n  }\n\n  return {\n    init: init,\n    start: start\n  };\n};\n\n//# sourceURL=webpack:///./server_app/server.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ })

/******/ });