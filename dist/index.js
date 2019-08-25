"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _koa = _interopRequireDefault(require("koa"));

var _koaPug = _interopRequireDefault(require("koa-pug"));

var _socket = _interopRequireDefault(require("socket.io"));

var _http = _interopRequireDefault(require("http"));

var _koaMount = _interopRequireDefault(require("koa-mount"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koaLogger = _interopRequireDefault(require("koa-logger"));

var _koaWebpack = _interopRequireDefault(require("koa-webpack"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _koaGenericSession = _interopRequireDefault(require("koa-generic-session"));

var _lodash = _interopRequireDefault(require("lodash"));

var _routes = _interopRequireDefault(require("./routes"));

var _webpack = _interopRequireDefault(require("../webpack.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @flow
var isProduction = process.env.NODE_ENV === 'production';
var isDevelopment = !isProduction;

var _default = function _default() {
  var app = new _koa["default"]();
  app.keys = ['some secret hurr'];
  app.use((0, _koaGenericSession["default"])(app));
  app.use((0, _koaBodyparser["default"])()); // app.use(serve(path.join(__dirname, '..', 'public')));

  if (isDevelopment) {
    (0, _koaWebpack["default"])({
      config: _webpack["default"]
    }).then(function (middleware) {
      app.use(middleware);
    });
  } else {
    var urlPrefix = '/assets';

    var assetsPath = _path["default"].resolve("".concat(__dirname, "/../dist/public"));

    app.use((0, _koaMount["default"])(urlPrefix, (0, _koaStatic["default"])(assetsPath)));
  }

  var router = new _koaRouter["default"]();
  app.use((0, _koaLogger["default"])());
  var pug = new _koaPug["default"]({
    viewPath: _path["default"].join(__dirname, '..', 'views'),
    debug: true,
    pretty: true,
    compileDebug: true,
    locals: [],
    noCache: process.env.NODE_ENV !== 'production',
    basedir: _path["default"].join(__dirname, 'views'),
    helperPath: [{
      _: _lodash["default"]
    }, {
      urlFor: function urlFor() {
        return router.url.apply(router, arguments);
      }
    }]
  });
  pug.use(app);

  var server = _http["default"].createServer(app.callback());

  var io = (0, _socket["default"])(server);
  (0, _routes["default"])(router, io);
  app.use(router.allowedMethods());
  app.use(router.routes());
  return server;
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJpc1Byb2R1Y3Rpb24iLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJpc0RldmVsb3BtZW50IiwiYXBwIiwiS29hIiwia2V5cyIsInVzZSIsImNvbmZpZyIsIndlYnBhY2tDb25maWciLCJ0aGVuIiwibWlkZGxld2FyZSIsInVybFByZWZpeCIsImFzc2V0c1BhdGgiLCJwYXRoIiwicmVzb2x2ZSIsIl9fZGlybmFtZSIsInJvdXRlciIsIlJvdXRlciIsInB1ZyIsIlB1ZyIsInZpZXdQYXRoIiwiam9pbiIsImRlYnVnIiwicHJldHR5IiwiY29tcGlsZURlYnVnIiwibG9jYWxzIiwibm9DYWNoZSIsImJhc2VkaXIiLCJoZWxwZXJQYXRoIiwiXyIsInVybEZvciIsInVybCIsInNlcnZlciIsImh0dHAiLCJjcmVhdGVTZXJ2ZXIiLCJjYWxsYmFjayIsImlvIiwiYWxsb3dlZE1ldGhvZHMiLCJyb3V0ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQWpCQTtBQW1CQSxJQUFNQSxZQUFZLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTlDO0FBQ0EsSUFBTUMsYUFBYSxHQUFHLENBQUNKLFlBQXZCOztlQUVlLG9CQUFNO0FBQ25CLE1BQU1LLEdBQUcsR0FBRyxJQUFJQyxlQUFKLEVBQVo7QUFFQUQsRUFBQUEsR0FBRyxDQUFDRSxJQUFKLEdBQVcsQ0FBQyxrQkFBRCxDQUFYO0FBQ0FGLEVBQUFBLEdBQUcsQ0FBQ0csR0FBSixDQUFRLG1DQUFRSCxHQUFSLENBQVI7QUFDQUEsRUFBQUEsR0FBRyxDQUFDRyxHQUFKLENBQVEsZ0NBQVIsRUFMbUIsQ0FNbkI7O0FBQ0EsTUFBSUosYUFBSixFQUFtQjtBQUNqQixnQ0FBVztBQUNUSyxNQUFBQSxNQUFNLEVBQUVDO0FBREMsS0FBWCxFQUVHQyxJQUZILENBRVEsVUFBQ0MsVUFBRCxFQUFnQjtBQUN0QlAsTUFBQUEsR0FBRyxDQUFDRyxHQUFKLENBQVFJLFVBQVI7QUFDRCxLQUpEO0FBS0QsR0FORCxNQU1PO0FBQ0wsUUFBTUMsU0FBUyxHQUFHLFNBQWxCOztBQUNBLFFBQU1DLFVBQVUsR0FBR0MsaUJBQUtDLE9BQUwsV0FBZ0JDLFNBQWhCLHFCQUFuQjs7QUFDQVosSUFBQUEsR0FBRyxDQUFDRyxHQUFKLENBQVEsMEJBQU1LLFNBQU4sRUFBaUIsMkJBQU1DLFVBQU4sQ0FBakIsQ0FBUjtBQUNEOztBQUVELE1BQU1JLE1BQU0sR0FBRyxJQUFJQyxxQkFBSixFQUFmO0FBRUFkLEVBQUFBLEdBQUcsQ0FBQ0csR0FBSixDQUFRLDRCQUFSO0FBQ0EsTUFBTVksR0FBRyxHQUFHLElBQUlDLGtCQUFKLENBQVE7QUFDbEJDLElBQUFBLFFBQVEsRUFBRVAsaUJBQUtRLElBQUwsQ0FBVU4sU0FBVixFQUFxQixJQUFyQixFQUEyQixPQUEzQixDQURRO0FBRWxCTyxJQUFBQSxLQUFLLEVBQUUsSUFGVztBQUdsQkMsSUFBQUEsTUFBTSxFQUFFLElBSFU7QUFJbEJDLElBQUFBLFlBQVksRUFBRSxJQUpJO0FBS2xCQyxJQUFBQSxNQUFNLEVBQUUsRUFMVTtBQU1sQkMsSUFBQUEsT0FBTyxFQUFFM0IsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFOaEI7QUFPbEIwQixJQUFBQSxPQUFPLEVBQUVkLGlCQUFLUSxJQUFMLENBQVVOLFNBQVYsRUFBcUIsT0FBckIsQ0FQUztBQVFsQmEsSUFBQUEsVUFBVSxFQUFFLENBQ1Y7QUFBRUMsTUFBQUEsQ0FBQyxFQUFEQTtBQUFGLEtBRFUsRUFFVjtBQUFFQyxNQUFBQSxNQUFNLEVBQUU7QUFBQSxlQUFhZCxNQUFNLENBQUNlLEdBQVAsT0FBQWYsTUFBTSxZQUFuQjtBQUFBO0FBQVYsS0FGVTtBQVJNLEdBQVIsQ0FBWjtBQWFBRSxFQUFBQSxHQUFHLENBQUNaLEdBQUosQ0FBUUgsR0FBUjs7QUFFQSxNQUFNNkIsTUFBTSxHQUFHQyxpQkFBS0MsWUFBTCxDQUFrQi9CLEdBQUcsQ0FBQ2dDLFFBQUosRUFBbEIsQ0FBZjs7QUFDQSxNQUFNQyxFQUFFLEdBQUcsd0JBQU9KLE1BQVAsQ0FBWDtBQUVBLDBCQUFVaEIsTUFBVixFQUFrQm9CLEVBQWxCO0FBQ0FqQyxFQUFBQSxHQUFHLENBQUNHLEdBQUosQ0FBUVUsTUFBTSxDQUFDcUIsY0FBUCxFQUFSO0FBQ0FsQyxFQUFBQSxHQUFHLENBQUNHLEdBQUosQ0FBUVUsTUFBTSxDQUFDc0IsTUFBUCxFQUFSO0FBRUEsU0FBT04sTUFBUDtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBLb2EgZnJvbSAna29hJztcbmltcG9ydCBQdWcgZnJvbSAna29hLXB1Zyc7XG5pbXBvcnQgc29ja2V0IGZyb20gJ3NvY2tldC5pbyc7XG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCBtb3VudCBmcm9tICdrb2EtbW91bnQnO1xuaW1wb3J0IHNlcnZlIGZyb20gJ2tvYS1zdGF0aWMnO1xuaW1wb3J0IFJvdXRlciBmcm9tICdrb2Etcm91dGVyJztcbmltcG9ydCBrb2FMb2dnZXIgZnJvbSAna29hLWxvZ2dlcic7XG5pbXBvcnQga29hV2VicGFjayBmcm9tICdrb2Etd2VicGFjayc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdrb2EtYm9keXBhcnNlcic7XG5pbXBvcnQgc2Vzc2lvbiBmcm9tICdrb2EtZ2VuZXJpYy1zZXNzaW9uJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgYWRkUm91dGVzIGZyb20gJy4vcm91dGVzJztcblxuaW1wb3J0IHdlYnBhY2tDb25maWcgZnJvbSAnLi4vd2VicGFjay5jb25maWcnO1xuXG5jb25zdCBpc1Byb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xuY29uc3QgaXNEZXZlbG9wbWVudCA9ICFpc1Byb2R1Y3Rpb247XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgY29uc3QgYXBwID0gbmV3IEtvYSgpO1xuXG4gIGFwcC5rZXlzID0gWydzb21lIHNlY3JldCBodXJyJ107XG4gIGFwcC51c2Uoc2Vzc2lvbihhcHApKTtcbiAgYXBwLnVzZShib2R5UGFyc2VyKCkpO1xuICAvLyBhcHAudXNlKHNlcnZlKHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdwdWJsaWMnKSkpO1xuICBpZiAoaXNEZXZlbG9wbWVudCkge1xuICAgIGtvYVdlYnBhY2soe1xuICAgICAgY29uZmlnOiB3ZWJwYWNrQ29uZmlnLFxuICAgIH0pLnRoZW4oKG1pZGRsZXdhcmUpID0+IHtcbiAgICAgIGFwcC51c2UobWlkZGxld2FyZSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdXJsUHJlZml4ID0gJy9hc3NldHMnO1xuICAgIGNvbnN0IGFzc2V0c1BhdGggPSBwYXRoLnJlc29sdmUoYCR7X19kaXJuYW1lfS8uLi9kaXN0L3B1YmxpY2ApO1xuICAgIGFwcC51c2UobW91bnQodXJsUHJlZml4LCBzZXJ2ZShhc3NldHNQYXRoKSkpO1xuICB9XG5cbiAgY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcigpO1xuXG4gIGFwcC51c2Uoa29hTG9nZ2VyKCkpO1xuICBjb25zdCBwdWcgPSBuZXcgUHVnKHtcbiAgICB2aWV3UGF0aDogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ3ZpZXdzJyksXG4gICAgZGVidWc6IHRydWUsXG4gICAgcHJldHR5OiB0cnVlLFxuICAgIGNvbXBpbGVEZWJ1ZzogdHJ1ZSxcbiAgICBsb2NhbHM6IFtdLFxuICAgIG5vQ2FjaGU6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsXG4gICAgYmFzZWRpcjogcGF0aC5qb2luKF9fZGlybmFtZSwgJ3ZpZXdzJyksXG4gICAgaGVscGVyUGF0aDogW1xuICAgICAgeyBfIH0sXG4gICAgICB7IHVybEZvcjogKC4uLmFyZ3MpID0+IHJvdXRlci51cmwoLi4uYXJncykgfSxcbiAgICBdLFxuICB9KTtcbiAgcHVnLnVzZShhcHApO1xuXG4gIGNvbnN0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcC5jYWxsYmFjaygpKTtcbiAgY29uc3QgaW8gPSBzb2NrZXQoc2VydmVyKTtcblxuICBhZGRSb3V0ZXMocm91dGVyLCBpbyk7XG4gIGFwcC51c2Uocm91dGVyLmFsbG93ZWRNZXRob2RzKCkpO1xuICBhcHAudXNlKHJvdXRlci5yb3V0ZXMoKSk7XG5cbiAgcmV0dXJuIHNlcnZlcjtcbn07XG4iXX0=