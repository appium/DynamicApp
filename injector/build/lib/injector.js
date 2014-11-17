"use strict";
Object.defineProperties(exports, {
  CodeInjector: {get: function() {
      return CodeInjector;
    }},
  log: {get: function() {
      return log;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__express__,
    $__http__,
    $__body_45_parser__,
    $__bluebird__,
    $__underscore__,
    $__request_45_async__,
    $__log__;
var express = ($__express__ = require("express"), $__express__ && $__express__.__esModule && $__express__ || {default: $__express__}).default;
var http = ($__http__ = require("http"), $__http__ && $__http__.__esModule && $__http__ || {default: $__http__}).default;
var bodyParser = ($__body_45_parser__ = require("body-parser"), $__body_45_parser__ && $__body_45_parser__.__esModule && $__body_45_parser__ || {default: $__body_45_parser__}).default;
var Promise = ($__bluebird__ = require("bluebird"), $__bluebird__ && $__bluebird__.__esModule && $__bluebird__ || {default: $__bluebird__}).default;
var _ = ($__underscore__ = require("underscore"), $__underscore__ && $__underscore__.__esModule && $__underscore__ || {default: $__underscore__}).default;
var requestAsync = ($__request_45_async__ = require("./request-async"), $__request_45_async__ && $__request_45_async__.__esModule && $__request_45_async__ || {default: $__request_45_async__}).requestAsync;
var $__6 = ($__log__ = require("./log"), $__log__ && $__log__.__esModule && $__log__ || {default: $__log__}),
    Logger = $__6.Logger,
    log = $__6.log;
var logger = new Logger('code-injector');
var DEFAULT_PORT = 8085;
var IOS = 'iOS';
var ANDROID = 'Android';
var normalizeDeviceType = (function() {
  var deviceType = arguments[0] !== (void 0) ? arguments[0] : null;
  var resDeviceType = null;
  if (!_.isNull(deviceType)) {
    resDeviceType = _([IOS, ANDROID]).find((function(cat) {
      return cat.toLowerCase() === deviceType.toLowerCase().trim();
    }));
  }
  if (_.isNull(resDeviceType))
    throw new Error('Could not determine device Type');
  return resDeviceType;
});
var CodeInjector = function CodeInjector(deviceType) {
  var port = arguments[1] !== (void 0) ? arguments[1] : DEFAULT_PORT;
  this.deviceType = normalizeDeviceType(deviceType);
  this.port = parseInt(port, 10);
  this.opts = {};
  this.code = null;
};
($traceurRuntime.createClass)(CodeInjector, {
  withOpts: function() {
    var opts = arguments[0] !== (void 0) ? arguments[0] : {};
    this.opts = opts;
    return this;
  },
  start: function() {
    var $__7;
    return $traceurRuntime.asyncWrap(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $__7 = this;
            this.app = express();
            this.app.use(bodyParser.json());
            this.app.post('/code', (function(req, res) {
              $__7.code = req.body.code;
              res.send(200);
            }));
            this.app.get('/code', (function(req, res) {
              var code = $__7.code;
              if (!$__7.opts.noDelete)
                $__7.code = null;
              res.json({code: code});
            }));
            this.server = Promise.promisifyAll(http.createServer(this.app));
            logger.info('code injector listening on', this.port);
            $ctx.state = 4;
            break;
          case 4:
            Promise.resolve(this.server.listenAsync(this.port)).then($ctx.createCallback(-2), $ctx.errback);
            return;
          default:
            return $ctx.end();
        }
    }, this);
  },
  stop: function() {
    return $traceurRuntime.asyncWrap(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            logger.info('stoping code injector');
            $ctx.state = 4;
            break;
          case 4:
            Promise.resolve(this.server.closeAsync()).then($ctx.createCallback(-2), $ctx.errback);
            return;
          default:
            return $ctx.end();
        }
    }, this);
  },
  postCode: function(code) {
    var res,
        $__10,
        $__11,
        $__12,
        $__13,
        $__14;
    return $traceurRuntime.asyncWrap(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            code = '' + code;
            $ctx.state = 9;
            break;
          case 9:
            $__10 = this.port;
            $__11 = {
              uri: 'http://localhost:' + $__10 + '/code',
              json: {code: code},
              method: 'POST'
            };
            $__12 = requestAsync($__11);
            $ctx.state = 5;
            break;
          case 5:
            Promise.resolve($__12).then($ctx.createCallback(3), $ctx.errback);
            return;
          case 3:
            $__13 = $ctx.value;
            $ctx.state = 2;
            break;
          case 2:
            $__14 = $__13[0];
            res = $__14;
            $ctx.state = 7;
            break;
          case 7:
            if (res.statusCode !== 200)
              throw new Error('code POST failed, statusCode -->', res.statusCode, ' .');
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, this);
  },
  injectCode: function(driver, code) {
    return $traceurRuntime.asyncWrap(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            Promise.resolve(this.postCode(code)).then($ctx.createCallback(2), $ctx.errback);
            return;
          case 2:
            $ctx.state = (env.IOS) ? 3 : 13;
            break;
          case 3:
            Promise.resolve(driver.waitForElementByAccessibilityId('welcome_start').click()).then($ctx.createCallback(4), $ctx.errback);
            return;
          case 4:
            Promise.resolve(driver.waitForElementByAccessibilityId('test_close')).then($ctx.createCallback(-2), $ctx.errback);
            return;
          case 13:
            $ctx.state = (env.ANDROID) ? 7 : 11;
            break;
          case 7:
            Promise.resolve(driver.elementByAndroidUIAutomator('new UiSelector().descriptionContains("welcome_start")').click()).then($ctx.createCallback(8), $ctx.errback);
            return;
          case 8:
            Promise.resolve(driver.waitForElementByAndroidUIAutomator('new UiSelector().descriptionContains("test_close")')).then($ctx.createCallback(-2), $ctx.errback);
            return;
          case 11:
            throw new Error('Unknown env.');
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, this);
  },
  clearCode: function(driver) {
    return $traceurRuntime.asyncWrap(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $ctx.state = (env.IOS) ? 1 : 11;
            break;
          case 1:
            Promise.resolve(driver.waitForElementById('test_close').click()).then($ctx.createCallback(2), $ctx.errback);
            return;
          case 2:
            Promise.resolve(waitForElementById('welcome_start')).then($ctx.createCallback(-2), $ctx.errback);
            return;
          case 11:
            $ctx.state = (env.ANDROID) ? 5 : 9;
            break;
          case 5:
            Promise.resolve(driver.waitForElementByAndroidUIAutomator('new UiSelector().descriptionContains("test_close")').click()).then($ctx.createCallback(6), $ctx.errback);
            return;
          case 6:
            Promise.resolve(driver.waitForElementByAndroidUIAutomator('new UiSelector().descriptionContains("welcome_start")')).then($ctx.createCallback(-2), $ctx.errback);
            return;
          case 9:
            throw new Error('Unknown env.');
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, this);
  }
}, {});
;
var $__default = CodeInjector;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3IuZXM3Iiwic291cmNlcyI6WyJpbmplY3Rvci5lczciLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci81IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci82IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOCIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci85IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEwIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEyIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE0IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzExIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE1IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE2IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxLQUFLLGlCQUFpQixBQUFDLENBQUMsT0FBTTtjQ0E5QixFQUFDLEdBQUUsWUNBcUI7QUFBRSx5QkFBd0I7SUFBRSxBREE5QixDQUFDO0tBQXZCLEVBQUMsR0FBRSxZQ0FxQjtBQUFFLGdCQUF3QjtJQUFFLEFEQTlCLENBQUM7U0FBdkIsRUFBQyxHQUFFLFlDQXFCO0FBQUUsdUJBQXdCO0lBQUUsQURBOUIsQ0FBQztBRUF2QixXQUFTLEND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dHMvV29yay9EeW5hbWljQXBwL2luamVjdG9yL2xpYi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQge3JlcXVlc3RBc3luY30gZnJvbSAnLi9yZXF1ZXN0LWFzeW5jJztcbmltcG9ydCB7TG9nZ2VyLCBsb2d9IGZyb20gJy4vbG9nJztcblxubGV0IGxvZ2dlciA9IG5ldyBMb2dnZXIoJ2NvZGUtaW5qZWN0b3InKTtcblxuY29uc3QgREVGQVVMVF9QT1JUID0gODA4NTtcbmNvbnN0IElPUyA9ICdpT1MnO1xuY29uc3QgQU5EUk9JRCA9ICdBbmRyb2lkJztcblxubGV0IG5vcm1hbGl6ZURldmljZVR5cGUgPSAoZGV2aWNlVHlwZT1udWxsKSA9PiB7XG4gIGxldCByZXNEZXZpY2VUeXBlID0gbnVsbDtcbiAgaWYoIV8uaXNOdWxsKGRldmljZVR5cGUpKSB7XG4gICAgcmVzRGV2aWNlVHlwZSA9IF8oW0lPUyxBTkRST0lEXSkuZmluZCgoY2F0KSA9PiB7XG4gICAgICByZXR1cm4gY2F0LnRvTG93ZXJDYXNlKCkgPT09IGRldmljZVR5cGUudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgfSk7XG4gIH1cbiAgaWYoXy5pc051bGwocmVzRGV2aWNlVHlwZSkpIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGRldGVybWluZSBkZXZpY2UgVHlwZScpO1xuICByZXR1cm4gcmVzRGV2aWNlVHlwZTtcbn07XG5cbmNsYXNzIENvZGVJbmplY3RvciB7XG4gIGNvbnN0cnVjdG9yKGRldmljZVR5cGUsIHBvcnQ9REVGQVVMVF9QT1JUKSB7XG4gICAgdGhpcy5kZXZpY2VUeXBlID0gbm9ybWFsaXplRGV2aWNlVHlwZShkZXZpY2VUeXBlKTtcbiAgICB0aGlzLnBvcnQgPSBwYXJzZUludChwb3J0LCAxMCk7XG4gICAgdGhpcy5vcHRzID0ge307XG4gICAgdGhpcy5jb2RlID0gbnVsbDtcbiAgfVxuXG4gIHdpdGhPcHRzIChvcHRzPXt9KSB7XG4gICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIHRoaXMuYXBwID0gZXhwcmVzcygpO1xuICAgIHRoaXMuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbiAgICB0aGlzLmFwcC5wb3N0KCcvY29kZScsIChyZXEsIHJlcykgPT4ge1xuICAgICAgLy8gY2FjaGluZyBjb2RlIGFuZCByZXR1cm5pbmcgMjAwXG4gICAgICB0aGlzLmNvZGUgPSByZXEuYm9keS5jb2RlO1xuICAgICAgLy90aGlzLnNpbGx5KCdjb2RlIGluamVjdG9yIGlzIHNhdmluZyBjb2RlLiAgY29kZSAtLT4nLCB0aGlzLmNvZGUpO1xuICAgICAgcmVzLnNlbmQoMjAwKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYXBwLmdldCgnL2NvZGUnLCAocmVxLCByZXMpID0+IHtcbiAgICAgIC8vIHJldHJpZXZpbmcgdGhlIGNvZGUgYW5kIHJlbW92aW5nIGl0IGZyb20gY2FjaGVcbiAgICAgIGxldCBjb2RlID0gdGhpcy5jb2RlO1xuICAgICAgaWYgKCF0aGlzLm9wdHMubm9EZWxldGUpIHRoaXMuY29kZSA9IG51bGw7XG4gICAgICAvL3RoaXMuc2lsbHkoJ2NvZGUgaW5qZWN0b3IgaXMgc2VuZGluZyBjb2RlLiBjb2RlIC0tPicsIGNvZGUpO1xuICAgICAgcmVzLmpzb24oeyBjb2RlOiBjb2RlIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZXJ2ZXIgPSBQcm9taXNlLnByb21pc2lmeUFsbCggaHR0cC5jcmVhdGVTZXJ2ZXIodGhpcy5hcHApKTtcbiAgICBsb2dnZXIuaW5mbygnY29kZSBpbmplY3RvciBsaXN0ZW5pbmcgb24nLCB0aGlzLnBvcnQpO1xuICAgIGF3YWl0IHRoaXMuc2VydmVyLmxpc3RlbkFzeW5jKHRoaXMucG9ydCk7XG4gIH1cblxuICBhc3luYyBzdG9wKCkge1xuICAgIGxvZ2dlci5pbmZvKCdzdG9waW5nIGNvZGUgaW5qZWN0b3InKTtcbiAgICBhd2FpdCB0aGlzLnNlcnZlci5jbG9zZUFzeW5jKCk7XG4gIH1cblxuICBhc3luYyBwb3N0Q29kZShjb2RlKSB7XG4gICAgY29kZSA9ICcnICsgY29kZTtcbiAgICBsZXQgW3Jlc10gPSBhd2FpdCByZXF1ZXN0QXN5bmMoe1xuICAgICAgdXJpOiAnaHR0cDovL2xvY2FsaG9zdDonICsgdGhpcy5wb3J0ICsgJy9jb2RlJyxcbiAgICAgIGpzb246IHtcbiAgICAgICAgY29kZTogY29kZVxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ1BPU1QnXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXNDb2RlICE9PSAyMDApIHRocm93IG5ldyBFcnJvcignY29kZSBQT1NUIGZhaWxlZCwgc3RhdHVzQ29kZSAtLT4nLCByZXMuc3RhdHVzQ29kZSwgJyAuJyk7XG4gIH1cblxuICBhc3luYyBpbmplY3RDb2RlKGRyaXZlciwgY29kZSkge1xuICAgIGF3YWl0IHRoaXMucG9zdENvZGUoY29kZSk7XG4gICAgaWYgKGVudi5JT1MpIHtcbiAgICAgIGF3YWl0IGRyaXZlci53YWl0Rm9yRWxlbWVudEJ5QWNjZXNzaWJpbGl0eUlkKCd3ZWxjb21lX3N0YXJ0JykuY2xpY2soKTtcbiAgICAgIGF3YWl0IGRyaXZlci53YWl0Rm9yRWxlbWVudEJ5QWNjZXNzaWJpbGl0eUlkKCd0ZXN0X2Nsb3NlJyk7XG4gICAgfSBlbHNlIGlmIChlbnYuQU5EUk9JRCkge1xuICAgICAgYXdhaXQgZHJpdmVyXG4gICAgICAgIC5lbGVtZW50QnlBbmRyb2lkVUlBdXRvbWF0b3IoXG4gICAgICAgICAgJ25ldyBVaVNlbGVjdG9yKCkuZGVzY3JpcHRpb25Db250YWlucyhcIndlbGNvbWVfc3RhcnRcIiknKS5jbGljaygpO1xuICAgICAgYXdhaXQgZHJpdmVyLndhaXRGb3JFbGVtZW50QnlBbmRyb2lkVUlBdXRvbWF0b3IoXG4gICAgICAgICduZXcgVWlTZWxlY3RvcigpLmRlc2NyaXB0aW9uQ29udGFpbnMoXCJ0ZXN0X2Nsb3NlXCIpJyk7XG4gICAgfSBlbHNlIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbnYuJyk7XG4gIH1cblxuICBhc3luYyBjbGVhckNvZGUoZHJpdmVyKSB7XG4gICAgaWYgKGVudi5JT1MpIHtcbiAgICAgIGF3YWl0IGRyaXZlci53YWl0Rm9yRWxlbWVudEJ5SWQoJ3Rlc3RfY2xvc2UnKS5jbGljaygpO1xuICAgICAgYXdhaXQgd2FpdEZvckVsZW1lbnRCeUlkKCd3ZWxjb21lX3N0YXJ0Jyk7XG4gICAgfSBlbHNlIGlmIChlbnYuQU5EUk9JRCkge1xuICAgICAgYXdhaXQgZHJpdmVyLndhaXRGb3JFbGVtZW50QnlBbmRyb2lkVUlBdXRvbWF0b3IoXG4gICAgICAgICduZXcgVWlTZWxlY3RvcigpLmRlc2NyaXB0aW9uQ29udGFpbnMoXCJ0ZXN0X2Nsb3NlXCIpJykuY2xpY2soKTtcbiAgICAgIGF3YWl0IGRyaXZlci53YWl0Rm9yRWxlbWVudEJ5QW5kcm9pZFVJQXV0b21hdG9yKFxuICAgICAgICAnbmV3IFVpU2VsZWN0b3IoKS5kZXNjcmlwdGlvbkNvbnRhaW5zKFwid2VsY29tZV9zdGFydFwiKScpO1xuICAgIH0gZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW52LicpO1xuICB9XG59XG5cbmV4cG9ydCB7Q29kZUluamVjdG9yLCBsb2d9O1xuZXhwb3J0IGRlZmF1bHQgQ29kZUluamVjdG9yO1xuXG4iLCJPYmplY3QuZGVmaW5lUHJvcGVydGllcyhleHBvcnRzLCAkX19wbGFjZWhvbGRlcl9fMCk7Iiwie2dldDogJF9fcGxhY2Vob2xkZXJfXzB9IiwiZ2V0ICRfX3BsYWNlaG9sZGVyX18wKCkgeyByZXR1cm4gJF9fcGxhY2Vob2xkZXJfXzE7IH0iLCJfX2VzTW9kdWxlOiB0cnVlIiwie3ZhbHVlOiAkX19wbGFjZWhvbGRlcl9fMH0iLCIoJF9fcGxhY2Vob2xkZXJfXzAgPSByZXF1aXJlKCRfX3BsYWNlaG9sZGVyX18xKSxcbiAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgJiYgJF9fcGxhY2Vob2xkZXJfXzMuX19lc01vZHVsZSAmJiAkX19wbGFjZWhvbGRlcl9fNCB8fCB7ZGVmYXVsdDogJF9fcGxhY2Vob2xkZXJfXzV9KSIsInZhciAkX19wbGFjZWhvbGRlcl9fMCA9ICRfX3BsYWNlaG9sZGVyX18xIiwiKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoJF9fcGxhY2Vob2xkZXJfXzAsICRfX3BsYWNlaG9sZGVyX18xLCAkX19wbGFjZWhvbGRlcl9fMikiLCJyZXR1cm4gJF9fcGxhY2Vob2xkZXJfXzAoXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18xLCB0aGlzKTsiLCIkdHJhY2V1clJ1bnRpbWUuYXN5bmNXcmFwIiwiZnVuY3Rpb24oJGN0eCkge1xuICAgICAgd2hpbGUgKHRydWUpICRfX3BsYWNlaG9sZGVyX18wXG4gICAgfSIsIlByb21pc2UucmVzb2x2ZSgkX19wbGFjZWhvbGRlcl9fMCkudGhlbihcbiAgICAgICAgICAkY3R4LmNyZWF0ZUNhbGxiYWNrKCRfX3BsYWNlaG9sZGVyX18xKSwgJGN0eC5lcnJiYWNrKTtcbiAgICAgICAgICByZXR1cm47IiwicmV0dXJuICRjdHguZW5kKCkiLCIkY3R4LnZhbHVlIiwiJGN0eC5zdGF0ZSA9ICgkX19wbGFjZWhvbGRlcl9fMCkgPyAkX19wbGFjZWhvbGRlcl9fMSA6ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICBicmVhayIsInZhciAkX19kZWZhdWx0ID0gJF9fcGxhY2Vob2xkZXJfXzAiXX0=
