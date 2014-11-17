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
var a = function() {
  return $traceurRuntime.asyncWrap(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, this);
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3IuZXM3Iiwic291cmNlcyI6WyJpbmplY3Rvci5lczciLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci81IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci82IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTQiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTAiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTMiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTIiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOCIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci85IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzExIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE1IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE2IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxLQUFLLGlCQUFpQixBQUFDLENBQUMsT0FBTTtjQ0E5QixFQUFDLEdBQUUsWUNBcUI7QUFBRSx5QkFBd0I7SUFBRSxBREE5QixDQUFDO0tBQXZCLEVBQUMsR0FBRSxZQ0FxQjtBQUFFLGdCQUF3QjtJQUFFLEFEQTlCLENBQUM7U0FBdkIsRUFBQyxHQUFFLFlDQXFCO0FBQUUsdUJBQXdCO0lBQUUsQURBOUIsQ0FBQztBRUF2QixXQUFTLEND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QUM7Ozs7QVUxRzFDLGlCQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsRUFBQyxDQUFBOztBRENtQixJQUMvQixDRkQ2QixLQUFHLENBQUMsQ0FBQztFUDBHcEM7S1kzR21GOztBSUFyRixBQUFJLEVBQUEsQ0FBQSxVQUFTLEVoQitHRSxhZ0IvR2tCLEFoQitHUCxDZ0IvR087QWhCaUhqQyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYmFiYS9Eb2N1bWVudHMvV29yay9EeW5hbWljQXBwL2luamVjdG9yL2xpYi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQge3JlcXVlc3RBc3luY30gZnJvbSAnLi9yZXF1ZXN0LWFzeW5jJztcbmltcG9ydCB7TG9nZ2VyLCBsb2d9IGZyb20gJy4vbG9nJztcblxubGV0IGxvZ2dlciA9IG5ldyBMb2dnZXIoJ2NvZGUtaW5qZWN0b3InKTtcblxuY29uc3QgREVGQVVMVF9QT1JUID0gODA4NTtcbmNvbnN0IElPUyA9ICdpT1MnO1xuY29uc3QgQU5EUk9JRCA9ICdBbmRyb2lkJztcblxubGV0IG5vcm1hbGl6ZURldmljZVR5cGUgPSAoZGV2aWNlVHlwZT1udWxsKSA9PiB7XG4gIGxldCByZXNEZXZpY2VUeXBlID0gbnVsbDtcbiAgaWYoIV8uaXNOdWxsKGRldmljZVR5cGUpKSB7XG4gICAgcmVzRGV2aWNlVHlwZSA9IF8oW0lPUyxBTkRST0lEXSkuZmluZCgoY2F0KSA9PiB7XG4gICAgICByZXR1cm4gY2F0LnRvTG93ZXJDYXNlKCkgPT09IGRldmljZVR5cGUudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgfSk7XG4gIH1cbiAgaWYoXy5pc051bGwocmVzRGV2aWNlVHlwZSkpIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGRldGVybWluZSBkZXZpY2UgVHlwZScpO1xuICByZXR1cm4gcmVzRGV2aWNlVHlwZTtcbn07XG5cbmxldCBhID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gIFxufVxuXG5jbGFzcyBDb2RlSW5qZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihkZXZpY2VUeXBlLCBwb3J0PURFRkFVTFRfUE9SVCkge1xuICAgIHRoaXMuZGV2aWNlVHlwZSA9IG5vcm1hbGl6ZURldmljZVR5cGUoZGV2aWNlVHlwZSk7XG4gICAgdGhpcy5wb3J0ID0gcGFyc2VJbnQocG9ydCwgMTApO1xuICAgIHRoaXMub3B0cyA9IHt9O1xuICAgIHRoaXMuY29kZSA9IG51bGw7XG4gIH1cblxuICB3aXRoT3B0cyAob3B0cz17fSkge1xuICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhc3luYyBzdGFydCgpIHtcbiAgICB0aGlzLmFwcCA9IGV4cHJlc3MoKTtcbiAgICB0aGlzLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG4gICAgdGhpcy5hcHAucG9zdCgnL2NvZGUnLCAocmVxLCByZXMpID0+IHtcbiAgICAgIC8vIGNhY2hpbmcgY29kZSBhbmQgcmV0dXJuaW5nIDIwMFxuICAgICAgdGhpcy5jb2RlID0gcmVxLmJvZHkuY29kZTtcbiAgICAgIC8vdGhpcy5zaWxseSgnY29kZSBpbmplY3RvciBpcyBzYXZpbmcgY29kZS4gIGNvZGUgLS0+JywgdGhpcy5jb2RlKTtcbiAgICAgIHJlcy5zZW5kKDIwMCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFwcC5nZXQoJy9jb2RlJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgICAvLyByZXRyaWV2aW5nIHRoZSBjb2RlIGFuZCByZW1vdmluZyBpdCBmcm9tIGNhY2hlXG4gICAgICBsZXQgY29kZSA9IHRoaXMuY29kZTtcbiAgICAgIGlmICghdGhpcy5vcHRzLm5vRGVsZXRlKSB0aGlzLmNvZGUgPSBudWxsO1xuICAgICAgLy90aGlzLnNpbGx5KCdjb2RlIGluamVjdG9yIGlzIHNlbmRpbmcgY29kZS4gY29kZSAtLT4nLCBjb2RlKTtcbiAgICAgIHJlcy5qc29uKHsgY29kZTogY29kZSB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2VydmVyID0gUHJvbWlzZS5wcm9taXNpZnlBbGwoIGh0dHAuY3JlYXRlU2VydmVyKHRoaXMuYXBwKSk7XG4gICAgbG9nZ2VyLmluZm8oJ2NvZGUgaW5qZWN0b3IgbGlzdGVuaW5nIG9uJywgdGhpcy5wb3J0KTtcbiAgICBhd2FpdCB0aGlzLnNlcnZlci5saXN0ZW5Bc3luYyh0aGlzLnBvcnQpO1xuICB9XG5cbiAgYXN5bmMgc3RvcCgpIHtcbiAgICBsb2dnZXIuaW5mbygnc3RvcGluZyBjb2RlIGluamVjdG9yJyk7XG4gICAgYXdhaXQgdGhpcy5zZXJ2ZXIuY2xvc2VBc3luYygpO1xuICB9XG5cbiAgYXN5bmMgcG9zdENvZGUoY29kZSkge1xuICAgIGNvZGUgPSAnJyArIGNvZGU7XG4gICAgbGV0IFtyZXNdID0gYXdhaXQgcmVxdWVzdEFzeW5jKHtcbiAgICAgIHVyaTogJ2h0dHA6Ly9sb2NhbGhvc3Q6JyArIHRoaXMucG9ydCArICcvY29kZScsXG4gICAgICBqc29uOiB7XG4gICAgICAgIGNvZGU6IGNvZGVcbiAgICAgIH0sXG4gICAgICBtZXRob2Q6ICdQT1NUJ1xuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoJ2NvZGUgUE9TVCBmYWlsZWQsIHN0YXR1c0NvZGUgLS0+JywgcmVzLnN0YXR1c0NvZGUsICcgLicpO1xuICB9XG5cbiAgYXN5bmMgaW5qZWN0Q29kZShkcml2ZXIsIGNvZGUpIHtcbiAgICBhd2FpdCB0aGlzLnBvc3RDb2RlKGNvZGUpO1xuICAgIGlmIChlbnYuSU9TKSB7XG4gICAgICBhd2FpdCBkcml2ZXIud2FpdEZvckVsZW1lbnRCeUFjY2Vzc2liaWxpdHlJZCgnd2VsY29tZV9zdGFydCcpLmNsaWNrKCk7XG4gICAgICBhd2FpdCBkcml2ZXIud2FpdEZvckVsZW1lbnRCeUFjY2Vzc2liaWxpdHlJZCgndGVzdF9jbG9zZScpO1xuICAgIH0gZWxzZSBpZiAoZW52LkFORFJPSUQpIHtcbiAgICAgIGF3YWl0IGRyaXZlclxuICAgICAgICAuZWxlbWVudEJ5QW5kcm9pZFVJQXV0b21hdG9yKFxuICAgICAgICAgICduZXcgVWlTZWxlY3RvcigpLmRlc2NyaXB0aW9uQ29udGFpbnMoXCJ3ZWxjb21lX3N0YXJ0XCIpJykuY2xpY2soKTtcbiAgICAgIGF3YWl0IGRyaXZlci53YWl0Rm9yRWxlbWVudEJ5QW5kcm9pZFVJQXV0b21hdG9yKFxuICAgICAgICAnbmV3IFVpU2VsZWN0b3IoKS5kZXNjcmlwdGlvbkNvbnRhaW5zKFwidGVzdF9jbG9zZVwiKScpO1xuICAgIH0gZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW52LicpO1xuICB9XG5cbiAgYXN5bmMgY2xlYXJDb2RlKGRyaXZlcikge1xuICAgIGlmIChlbnYuSU9TKSB7XG4gICAgICBhd2FpdCBkcml2ZXIud2FpdEZvckVsZW1lbnRCeUlkKCd0ZXN0X2Nsb3NlJykuY2xpY2soKTtcbiAgICAgIGF3YWl0IHdhaXRGb3JFbGVtZW50QnlJZCgnd2VsY29tZV9zdGFydCcpO1xuICAgIH0gZWxzZSBpZiAoZW52LkFORFJPSUQpIHtcbiAgICAgIGF3YWl0IGRyaXZlci53YWl0Rm9yRWxlbWVudEJ5QW5kcm9pZFVJQXV0b21hdG9yKFxuICAgICAgICAnbmV3IFVpU2VsZWN0b3IoKS5kZXNjcmlwdGlvbkNvbnRhaW5zKFwidGVzdF9jbG9zZVwiKScpLmNsaWNrKCk7XG4gICAgICBhd2FpdCBkcml2ZXIud2FpdEZvckVsZW1lbnRCeUFuZHJvaWRVSUF1dG9tYXRvcihcbiAgICAgICAgJ25ldyBVaVNlbGVjdG9yKCkuZGVzY3JpcHRpb25Db250YWlucyhcIndlbGNvbWVfc3RhcnRcIiknKTtcbiAgICB9IGVsc2UgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVudi4nKTtcbiAgfVxufVxuXG5leHBvcnQge0NvZGVJbmplY3RvciwgbG9nfTtcbmV4cG9ydCBkZWZhdWx0IENvZGVJbmplY3RvcjtcblxuIiwiT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZXhwb3J0cywgJF9fcGxhY2Vob2xkZXJfXzApOyIsIntnZXQ6ICRfX3BsYWNlaG9sZGVyX18wfSIsImdldCAkX19wbGFjZWhvbGRlcl9fMCgpIHsgcmV0dXJuICRfX3BsYWNlaG9sZGVyX18xOyB9IiwiX19lc01vZHVsZTogdHJ1ZSIsInt2YWx1ZTogJF9fcGxhY2Vob2xkZXJfXzB9IiwiKCRfX3BsYWNlaG9sZGVyX18wID0gcmVxdWlyZSgkX19wbGFjZWhvbGRlcl9fMSksXG4gICAgICAgICRfX3BsYWNlaG9sZGVyX18yICYmICRfX3BsYWNlaG9sZGVyX18zLl9fZXNNb2R1bGUgJiYgJF9fcGxhY2Vob2xkZXJfXzQgfHwge2RlZmF1bHQ6ICRfX3BsYWNlaG9sZGVyX181fSkiLCJyZXR1cm4gJF9fcGxhY2Vob2xkZXJfXzAoXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18xLCB0aGlzKTsiLCIkdHJhY2V1clJ1bnRpbWUuYXN5bmNXcmFwIiwiZnVuY3Rpb24oJGN0eCkge1xuICAgICAgd2hpbGUgKHRydWUpICRfX3BsYWNlaG9sZGVyX18wXG4gICAgfSIsInJldHVybiAkY3R4LmVuZCgpIiwidmFyICRfX3BsYWNlaG9sZGVyX18wID0gJF9fcGxhY2Vob2xkZXJfXzEiLCIoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKSgkX19wbGFjZWhvbGRlcl9fMCwgJF9fcGxhY2Vob2xkZXJfXzEsICRfX3BsYWNlaG9sZGVyX18yKSIsIlByb21pc2UucmVzb2x2ZSgkX19wbGFjZWhvbGRlcl9fMCkudGhlbihcbiAgICAgICAgICAkY3R4LmNyZWF0ZUNhbGxiYWNrKCRfX3BsYWNlaG9sZGVyX18xKSwgJGN0eC5lcnJiYWNrKTtcbiAgICAgICAgICByZXR1cm47IiwiJGN0eC52YWx1ZSIsIiRjdHguc3RhdGUgPSAoJF9fcGxhY2Vob2xkZXJfXzApID8gJF9fcGxhY2Vob2xkZXJfXzEgOiAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgYnJlYWsiLCJ2YXIgJF9fZGVmYXVsdCA9ICRfX3BsYWNlaG9sZGVyX18wIl19
