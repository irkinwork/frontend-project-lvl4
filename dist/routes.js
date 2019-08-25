"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getNextId = function getNextId() {
  return Number(_lodash["default"].uniqueId());
};

var _default = function _default(router, io) {
  var generalChannelId = getNextId();
  var randomChannelId = getNextId();
  var defaultState = {
    channels: [{
      id: generalChannelId,
      name: 'general',
      removable: false
    }, {
      id: randomChannelId,
      name: 'random',
      removable: false
    }],
    messages: [],
    currentChannelId: generalChannelId
  };

  var state = _objectSpread({}, defaultState);

  var apiRouter = new _koaRouter["default"]();
  apiRouter.get('/channels', function (ctx) {
    ctx.body = state.channels;
    ctx.status = 301;
  }).post('/channels', function (ctx) {
    var name = ctx.request.body.data.attributes.name;
    var channel = {
      name: name,
      removable: true,
      id: getNextId()
    };
    state.channels.push(channel);
    ctx.status = 201;
    var data = {
      data: {
        type: 'channels',
        id: channel.id,
        attributes: channel
      }
    };
    ctx.body = data;
    io.emit('newChannel', data);
  })["delete"]('/channels/:id', function (ctx) {
    var channelId = Number(ctx.params.id);
    state.channels = state.channels.filter(function (c) {
      return c.id !== channelId;
    });
    state.messages = state.messages.filter(function (m) {
      return m.channelId !== channelId;
    });
    ctx.status = 204;
    var data = {
      data: {
        type: 'channels',
        id: channelId
      }
    };
    io.emit('removeChannel', data);
  }).patch('/channels/:id', function (ctx) {
    var channelId = Number(ctx.params.id);
    var channel = state.channels.find(function (c) {
      return c.id === channelId;
    });
    var attributes = ctx.request.body.data.attributes;
    channel.name = attributes.name;
    ctx.status = 204;
    var data = {
      data: {
        type: 'channels',
        id: channelId,
        attributes: channel
      }
    };
    io.emit('renameChannel', data);
  }).get('/channels/:channelId/messages', function (ctx) {
    var messages = state.messages.filter(function (m) {
      return m.channelId === Number(ctx.params.channelId);
    });
    var resources = messages.map(function (m) {
      return {
        type: 'messages',
        id: m.id,
        attributes: m
      };
    });
    ctx.body = resources;
  }).post('/channels/:channelId/messages', function (ctx) {
    var attributes = ctx.request.body.data.attributes;

    var message = _objectSpread({}, attributes, {
      channelId: Number(ctx.params.channelId),
      id: getNextId()
    });

    state.messages.push(message);
    ctx.status = 201;
    var data = {
      data: {
        type: 'messages',
        id: message.id,
        attributes: message
      }
    };
    ctx.body = data;
    io.emit('newMessage', data);
  });
  return router.get('root', '/', function (ctx) {
    ctx.render('index', {
      gon: state
    });
  }).use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods());
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci9yb3V0ZXMuanMiXSwibmFtZXMiOlsiZ2V0TmV4dElkIiwiTnVtYmVyIiwiXyIsInVuaXF1ZUlkIiwicm91dGVyIiwiaW8iLCJnZW5lcmFsQ2hhbm5lbElkIiwicmFuZG9tQ2hhbm5lbElkIiwiZGVmYXVsdFN0YXRlIiwiY2hhbm5lbHMiLCJpZCIsIm5hbWUiLCJyZW1vdmFibGUiLCJtZXNzYWdlcyIsImN1cnJlbnRDaGFubmVsSWQiLCJzdGF0ZSIsImFwaVJvdXRlciIsIlJvdXRlciIsImdldCIsImN0eCIsImJvZHkiLCJzdGF0dXMiLCJwb3N0IiwicmVxdWVzdCIsImRhdGEiLCJhdHRyaWJ1dGVzIiwiY2hhbm5lbCIsInB1c2giLCJ0eXBlIiwiZW1pdCIsImNoYW5uZWxJZCIsInBhcmFtcyIsImZpbHRlciIsImMiLCJtIiwicGF0Y2giLCJmaW5kIiwicmVzb3VyY2VzIiwibWFwIiwibWVzc2FnZSIsInJlbmRlciIsImdvbiIsInVzZSIsInJvdXRlcyIsImFsbG93ZWRNZXRob2RzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLEdBQUcsU0FBWkEsU0FBWTtBQUFBLFNBQU1DLE1BQU0sQ0FBQ0MsbUJBQUVDLFFBQUYsRUFBRCxDQUFaO0FBQUEsQ0FBbEI7O2VBRWUsa0JBQUNDLE1BQUQsRUFBU0MsRUFBVCxFQUFnQjtBQUM3QixNQUFNQyxnQkFBZ0IsR0FBR04sU0FBUyxFQUFsQztBQUNBLE1BQU1PLGVBQWUsR0FBR1AsU0FBUyxFQUFqQztBQUNBLE1BQU1RLFlBQVksR0FBRztBQUNuQkMsSUFBQUEsUUFBUSxFQUFFLENBQ1I7QUFBRUMsTUFBQUEsRUFBRSxFQUFFSixnQkFBTjtBQUF3QkssTUFBQUEsSUFBSSxFQUFFLFNBQTlCO0FBQXlDQyxNQUFBQSxTQUFTLEVBQUU7QUFBcEQsS0FEUSxFQUVSO0FBQUVGLE1BQUFBLEVBQUUsRUFBRUgsZUFBTjtBQUF1QkksTUFBQUEsSUFBSSxF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Q0ksSUFEc0MsQ0FDOUJDLFVBRDhCOztBQUU5QyxRQUFNYyxPQUFPLHFCQUNSZCxVQURRO0FBRVhLLE1BQUFBLFNBQVMsRUFBRTdCLE1BQU0sQ0FBQ2tCLEdBQUcsQ0FBQ1ksTUFBSixDQUFXRCxTQUFaLENBRk47QUFHWHBCLE1BQUFBLEVBQUUsRUFBRVYsU0FBUztBQUhGLE1BQWI7O0FBS0FlLElBQUFBLEtBQUssQ0FBQ0YsUUFBTixDQUFlYyxJQUFmLENBQW9CWSxPQUFwQjtBQUNBcEIsSUFBQUEsR0FBRyxDQUFDRSxNQUFKLEdBQWEsR0FBYjtBQUNBLFFBQU1HLElBQUksR0FBRztBQUNYQSxNQUFBQSxJQUFJLEVBQUU7QUFDSkksUUFBQUEsSUFBSSxFQUFFLFVBREY7QUFFSmxCLFFBQUFBLEVBQUUsRUFBRTZCLE9BQU8sQ0FBQzdCLEVBRlI7QUFHSmUsUUFBQUEsVUFBVSxFQUFFYztBQUhSO0FBREssS0FBYjtBQU9BcEIsSUFBQUEsR0FBRyxDQUFDQyxJQUFKLEdBQVdJLElBQVg7QUFDQW5CLElBQUFBLEVBQUUsQ0FBQ3dCLElBQUgsQ0FBUSxZQUFSLEVBQXNCTCxJQUF0QjtBQUNELEdBakZIO0FBbUZBLFNBQU9wQixNQUFNLENBQ1ZjLEdBREksQ0FDQSxNQURBLEVBQ1EsR0FEUixFQUNhLFVBQUNDLEdBQUQsRUFBUztBQUN6QkEsSUFBQUEsR0FBRyxDQUFDcUIsTUFBSixDQUFXLE9BQVgsRUFBb0I7QUFBRUMsTUFBQUEsR0FBRyxFQUFFMUI7QUFBUCxLQUFwQjtBQUNELEdBSEksRUFJSjJCLEdBSkksQ0FJQSxTQUpBLEVBSVcxQixTQUFTLENBQUMyQixNQUFWLEVBSlgsRUFJK0IzQixTQUFTLENBQUM0QixjQUFWLEVBSi9CLENBQVA7QUFLRCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBSb3V0ZXIgZnJvbSAna29hLXJvdXRlcic7XG5cbmNvbnN0IGdldE5leHRJZCA9ICgpID0+IE51bWJlcihfLnVuaXF1ZUlkKCkpO1xuXG5leHBvcnQgZGVmYXVsdCAocm91dGVyLCBpbykgPT4ge1xuICBjb25zdCBnZW5lcmFsQ2hhbm5lbElkID0gZ2V0TmV4dElkKCk7XG4gIGNvbnN0IHJhbmRvbUNoYW5uZWxJZCA9IGdldE5leHRJZCgpO1xuICBjb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgY2hhbm5lbHM6IFtcbiAgICAgIHsgaWQ6IGdlbmVyYWxDaGFubmVsSWQsIG5hbWU6ICdnZW5lcmFsJywgcmVtb3ZhYmxlOiBmYWxzZSB9LFxuICAgICAgeyBpZDogcmFuZG9tQ2hhbm5lbElkLCBuYW1lOiAncmFuZG9tJywgcmVtb3ZhYmxlOiBmYWxzZSB9LFxuICAgIF0sXG4gICAgbWVzc2FnZXM6IFtdLFxuICAgIGN1cnJlbnRDaGFubmVsSWQ6IGdlbmVyYWxDaGFubmVsSWQsXG4gIH07XG5cbiAgY29uc3Qgc3RhdGUgPSB7IC4uLmRlZmF1bHRTdGF0ZSB9O1xuXG4gIGNvbnN0IGFwaVJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcbiAgYXBpUm91dGVyXG4gICAgLmdldCgnL2NoYW5uZWxzJywgKGN0eCkgPT4ge1xuICAgICAgY3R4LmJvZHkgPSBzdGF0ZS5jaGFubmVscztcbiAgICAgIGN0eC5zdGF0dXMgPSAzMDE7XG4gICAgfSlcbiAgICAucG9zdCgnL2NoYW5uZWxzJywgKGN0eCkgPT4ge1xuICAgICAgY29uc3QgeyBkYXRhOiB7IGF0dHJpYnV0ZXM6IHsgbmFtZSB9IH0gfSA9IGN0eC5yZXF1ZXN0LmJvZHk7XG4gICAgICBjb25zdCBjaGFubmVsID0ge1xuICAgICAgICBuYW1lLFxuICAgICAgICByZW1vdmFibGU6IHRydWUsXG4gICAgICAgIGlkOiBnZXROZXh0SWQoKSxcbiAgICAgIH07XG4gICAgICBzdGF0ZS5jaGFubmVscy5wdXNoKGNoYW5uZWwpO1xuICAgICAgY3R4LnN0YXR1cyA9IDIwMTtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB0eXBlOiAnY2hhbm5lbHMnLFxuICAgICAgICAgIGlkOiBjaGFubmVsLmlkLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IGNoYW5uZWwsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY3R4LmJvZHkgPSBkYXRhO1xuXG4gICAgICBpby5lbWl0KCduZXdDaGFubmVsJywgZGF0YSk7XG4gICAgfSlcbiAgICAuZGVsZXRlKCcvY2hhbm5lbHMvOmlkJywgKGN0eCkgPT4ge1xuICAgICAgY29uc3QgY2hhbm5lbElkID0gTnVtYmVyKGN0eC5wYXJhbXMuaWQpO1xuICAgICAgc3RhdGUuY2hhbm5lbHMgPSBzdGF0ZS5jaGFubmVscy5maWx0ZXIoYyA9PiBjLmlkICE9PSBjaGFubmVsSWQpO1xuICAgICAgc3RhdGUubWVzc2FnZXMgPSBzdGF0ZS5tZXNzYWdlcy5maWx0ZXIobSA9PiBtLmNoYW5uZWxJZCAhPT0gY2hhbm5lbElkKTtcbiAgICAgIGN0eC5zdGF0dXMgPSAyMDQ7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdHlwZTogJ2NoYW5uZWxzJyxcbiAgICAgICAgICBpZDogY2hhbm5lbElkLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGlvLmVtaXQoJ3JlbW92ZUNoYW5uZWwnLCBkYXRhKTtcbiAgICB9KVxuICAgIC5wYXRjaCgnL2NoYW5uZWxzLzppZCcsIChjdHgpID0+IHtcbiAgICAgIGNvbnN0IGNoYW5uZWxJZCA9IE51bWJlcihjdHgucGFyYW1zLmlkKTtcbiAgICAgIGNvbnN0IGNoYW5uZWwgPSBzdGF0ZS5jaGFubmVscy5maW5kKGMgPT4gYy5pZCA9PT0gY2hhbm5lbElkKTtcblxuICAgICAgY29uc3QgeyBhdHRyaWJ1dGVzIH0gPSBjdHgucmVxdWVzdC5ib2R5LmRhdGE7XG4gICAgICBjaGFubmVsLm5hbWUgPSBhdHRyaWJ1dGVzLm5hbWU7XG4gICAgICBjdHguc3RhdHVzID0gMjA0O1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHR5cGU6ICdjaGFubmVscycsXG4gICAgICAgICAgaWQ6IGNoYW5uZWxJZCxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBjaGFubmVsLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGlvLmVtaXQoJ3JlbmFtZUNoYW5uZWwnLCBkYXRhKTtcbiAgICB9KVxuICAgIC5nZXQoJy9jaGFubmVscy86Y2hhbm5lbElkL21lc3NhZ2VzJywgKGN0eCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSBzdGF0ZS5tZXNzYWdlcy5maWx0ZXIobSA9PiBtLmNoYW5uZWxJZCA9PT0gTnVtYmVyKGN0eC5wYXJhbXMuY2hhbm5lbElkKSk7XG4gICAgICBjb25zdCByZXNvdXJjZXMgPSBtZXNzYWdlcy5tYXAobSA9PiAoe1xuICAgICAgICB0eXBlOiAnbWVzc2FnZXMnLFxuICAgICAgICBpZDogbS5pZCxcbiAgICAgICAgYXR0cmlidXRlczogbSxcbiAgICAgIH0pKTtcbiAgICAgIGN0eC5ib2R5ID0gcmVzb3VyY2VzO1xuICAgIH0pXG4gICAgLnBvc3QoJy9jaGFubmVscy86Y2hhbm5lbElkL21lc3NhZ2VzJywgKGN0eCkgPT4ge1xuICAgICAgY29uc3QgeyBkYXRhOiB7IGF0dHJpYnV0ZXMgfSB9ID0gY3R4LnJlcXVlc3QuYm9keTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgIC4uLmF0dHJpYnV0ZXMsXG4gICAgICAgIGNoYW5uZWxJZDogTnVtYmVyKGN0eC5wYXJhbXMuY2hhbm5lbElkKSxcbiAgICAgICAgaWQ6IGdldE5leHRJZCgpLFxuICAgICAgfTtcbiAgICAgIHN0YXRlLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICBjdHguc3RhdHVzID0gMjAxO1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHR5cGU6ICdtZXNzYWdlcycsXG4gICAgICAgICAgaWQ6IG1lc3NhZ2UuaWQsXG4gICAgICAgICAgYXR0cmlidXRlczogbWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjdHguYm9keSA9IGRhdGE7XG4gICAgICBpby5lbWl0KCduZXdNZXNzYWdlJywgZGF0YSk7XG4gICAgfSk7XG5cbiAgcmV0dXJuIHJvdXRlclxuICAgIC5nZXQoJ3Jvb3QnLCAnLycsIChjdHgpID0+IHtcbiAgICAgIGN0eC5yZW5kZXIoJ2luZGV4JywgeyBnb246IHN0YXRlIH0pO1xuICAgIH0pXG4gICAgLnVzZSgnL2FwaS92MScsIGFwaVJvdXRlci5yb3V0ZXMoKSwgYXBpUm91dGVyLmFsbG93ZWRNZXRob2RzKCkpO1xufTtcbiJdfQ==