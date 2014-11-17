"use strict";
var $__chai__,
    $__underscore__,
    $___46__46__47_lib_47_injector__,
    $___46__46__47_lib_47_request_45_async__;
require('source-map-support').install();
var chai = ($__chai__ = require("chai"), $__chai__ && $__chai__.__esModule && $__chai__ || {default: $__chai__}).default;
var _ = ($__underscore__ = require("underscore"), $__underscore__ && $__underscore__.__esModule && $__underscore__ || {default: $__underscore__}).default;
var $__2 = ($___46__46__47_lib_47_injector__ = require("../lib/injector"), $___46__46__47_lib_47_injector__ && $___46__46__47_lib_47_injector__.__esModule && $___46__46__47_lib_47_injector__ || {default: $___46__46__47_lib_47_injector__}),
    CodeInjector = $__2.CodeInjector,
    log = $__2.log;
var requestAsync = ($___46__46__47_lib_47_request_45_async__ = require("../lib/request-async"), $___46__46__47_lib_47_request_45_async__ && $___46__46__47_lib_47_request_45_async__.__esModule && $___46__46__47_lib_47_request_45_async__ || {default: $___46__46__47_lib_47_request_45_async__}).requestAsync;
chai.should();
log.level = process.env.VERBOSE ? 'silly' : 'warn';
describe('injector', (function() {
  it('should initialize injector', (function() {
    for (var $__4 = ['ios', 'iOS'][$traceurRuntime.toProperty(Symbol.iterator)](),
        $__5; !($__5 = $__4.next()).done; ) {
      var deviceType = $__5.value;
      {
        var injector$__9 = new CodeInjector(deviceType);
        injector$__9.deviceType.should.equal('iOS');
      }
    }
    for (var $__6 = ['android', 'Android'][$traceurRuntime.toProperty(Symbol.iterator)](),
        $__7; !($__7 = $__6.next()).done; ) {
      var deviceType$__10 = $__7.value;
      {
        var injector$__11 = new CodeInjector(deviceType$__10);
        injector$__11.deviceType.should.equal('Android');
      }
    }
    var injector = new CodeInjector('iOS', 7070).withOpts({randomOpt: 'abcd'});
    injector.port.should.equal(7070);
    injector.opts.randomOpt.should.equal('abcd');
    injector = new CodeInjector('iOS', '7171');
    injector.port.should.equal(7171);
  }));
  describe('quick e2e test', (function() {
    var injector,
        code = 'codeEvalRes="Hey I ran some code here!";';
    it('should start server', (function() {
      return $traceurRuntime.asyncWrap(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              injector = new CodeInjector('iOS');
              $ctx.state = 4;
              break;
            case 4:
              Promise.resolve(injector.start()).then($ctx.createCallback(-2), $ctx.errback);
              return;
            default:
              return $ctx.end();
          }
      }, this);
    }));
    it('should inject some code', (function() {
      return $traceurRuntime.asyncWrap(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              Promise.resolve(injector.postCode(code)).then($ctx.createCallback(2), $ctx.errback);
              return;
            case 2:
              injector.code.should.equal(code);
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, this);
    }));
    it('should retrieve the code', (function() {
      var res,
          $__12,
          $__13,
          $__14,
          $__15,
          $__16;
      return $traceurRuntime.asyncWrap(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__12 = injector.port;
              $__13 = {
                uri: 'http://localhost:' + $__12 + '/code',
                method: 'GET'
              };
              $__14 = requestAsync($__13);
              $ctx.state = 5;
              break;
            case 5:
              Promise.resolve($__14).then($ctx.createCallback(3), $ctx.errback);
              return;
            case 3:
              $__15 = $ctx.value;
              $ctx.state = 2;
              break;
            case 2:
              $__16 = $__15[0];
              res = $__16;
              $ctx.state = 7;
              break;
            case 7:
              res.statusCode.should.equal(200);
              JSON.parse(res.body).code.should.equal(code);
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, this);
    }));
    it('should stop the server', (function() {
      return $traceurRuntime.asyncWrap(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              Promise.resolve(injector.stop()).then($ctx.createCallback(2), $ctx.errback);
              return;
            case 2:
              injector = null;
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, this);
    }));
    after((function() {
      return $traceurRuntime.asyncWrap(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $ctx.state = (injector) ? 1 : -2;
              break;
            case 1:
              Promise.resolve(injector.stop()).then($ctx.createCallback(-2), $ctx.errback);
              return;
            default:
              return $ctx.end();
          }
      }, this);
    }));
  }));
}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3Itc3BlY3MuanMiLCJzb3VyY2VzIjpbImluamVjdG9yLXNwZWNzLmpzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTciLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTMiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTAiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTIiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTQiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTEiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTUiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7Ozs7O0FBQUEsTUFBTSxBQUFDLENBQUMsb0JBQW1CLENBQUMsUUFBUSxBQUFDLEVBQUMsQ0FBQztFQUVoQyxLQUFHLEVDSFYsRUFBQyxXQUFvQixDQUFBLE9BQU0sQUFBQyxRQUFrQixDQUN0QyxDQUFBLFlBQXFCLHFCQUEyQixDQUFBLFlBQXFCLEdBQUssRUFBQyxPQUFNLFdBQW1CLENBRDlELEFBQytELENBQUM7RURHdkcsRUFBQSxFQ0pQLEVBQUMsaUJBQW9CLENBQUEsT0FBTSxBQUFDLGNBQWtCLENBQ3RDLENBQUEsa0JBQXFCLDJCQUEyQixDQUFBLGtCQUFxQixHQUFLLEVBQUMsT0FBTSxpQkFBbUIsQ0FEOUQsQUFDK0QsQ0FBQztTQUQ5RyxFQUFDLGtDQUFvQixDQUFBLE9BQU0sQUFBQyxtQkFBa0IsQ0FDdEMsQ0FBQSxtQ0FBcUIsNENBQTJCLENBQUEsbUNBQXFCLEdBQUssRUFBQyxPQUFNLGtDQUFtQixDQUQ5RCxBQUMrRCxDQUFDO0FESXRHLGVBQVc7QUFBRyxNQUFFO0VBQ2hCLGFBQVcs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L1VzZXJzL2JhYmEvRG9jdW1lbnRzL1dvcmsvRHluYW1pY0FwcC9pbmplY3Rvci90ZXN0LyIsInNvdXJjZXNDb250ZW50IjpbIi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdGgvdG8vc291cmNlLm1hcFxucmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0JykuaW5zdGFsbCgpO1xuXG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHtDb2RlSW5qZWN0b3IsIGxvZ30gZnJvbSAnLi4vbGliL2luamVjdG9yJztcbmltcG9ydCB7cmVxdWVzdEFzeW5jfSBmcm9tICcuLi9saWIvcmVxdWVzdC1hc3luYyc7XG5cbmNoYWkuc2hvdWxkKCk7XG5cbmxvZy5sZXZlbCA9IHByb2Nlc3MuZW52LlZFUkJPU0UgPyAnc2lsbHknIDogJ3dhcm4nO1xuXG5kZXNjcmliZSgnaW5qZWN0b3InLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSBpbmplY3RvcicsKCkgPT4ge1xuICAgIGZvcihsZXQgZGV2aWNlVHlwZSBvZiBbJ2lvcycsJ2lPUyddKSB7XG4gICAgICBsZXQgaW5qZWN0b3IgPSBuZXcgQ29kZUluamVjdG9yKGRldmljZVR5cGUpO1xuICAgICAgaW5qZWN0b3IuZGV2aWNlVHlwZS5zaG91bGQuZXF1YWwoJ2lPUycpO1xuICAgIH1cbiAgICBmb3IobGV0IGRldmljZVR5cGUgb2YgWydhbmRyb2lkJywnQW5kcm9pZCddKSB7XG4gICAgICBsZXQgaW5qZWN0b3IgPSBuZXcgQ29kZUluamVjdG9yKGRldmljZVR5cGUpO1xuICAgICAgaW5qZWN0b3IuZGV2aWNlVHlwZS5zaG91bGQuZXF1YWwoJ0FuZHJvaWQnKTtcbiAgICB9XG4gICAgbGV0IGluamVjdG9yID0gbmV3IENvZGVJbmplY3RvcignaU9TJyw3MDcwKVxuICAgICAgLndpdGhPcHRzKHtyYW5kb21PcHQ6ICdhYmNkJ30pO1xuICAgIGluamVjdG9yLnBvcnQuc2hvdWxkLmVxdWFsKDcwNzApO1xuICAgIGluamVjdG9yLm9wdHMucmFuZG9tT3B0LnNob3VsZC5lcXVhbCgnYWJjZCcpO1xuICAgIGluamVjdG9yID0gbmV3IENvZGVJbmplY3RvcignaU9TJywnNzE3MScpO1xuICAgIGluamVjdG9yLnBvcnQuc2hvdWxkLmVxdWFsKDcxNzEpO1xuICB9KTtcblxuIGRlc2NyaWJlKCdxdWljayBlMmUgdGVzdCcsICgpID0+IHtcbiAgIGxldCBpbmplY3RvcixcbiAgICAgICAgY29kZSA9ICAnY29kZUV2YWxSZXM9XCJIZXkgSSByYW4gc29tZSBjb2RlIGhlcmUhXCI7JztcblxuICAgaXQoJ3Nob3VsZCBzdGFydCBzZXJ2ZXInLCBhc3luYyAoKSA9PiB7XG4gICAgIGluamVjdG9yID0gbmV3IENvZGVJbmplY3RvcignaU9TJyk7XG4gICAgIGF3YWl0IGluamVjdG9yLnN0YXJ0KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGluamVjdCBzb21lIGNvZGUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBpbmplY3Rvci5wb3N0Q29kZShjb2RlKTtcbiAgICAgIGluamVjdG9yLmNvZGUuc2hvdWxkLmVxdWFsKGNvZGUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSB0aGUgY29kZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBbcmVzXSA9IGF3YWl0IHJlcXVlc3RBc3luYyh7XG4gICAgICAgICB1cmk6ICdodHRwOi8vbG9jYWxob3N0OicgKyBpbmplY3Rvci5wb3J0ICsgJy9jb2RlJyxcbiAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICB9KTtcbiAgICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoMjAwKTtcbiAgICAgICBKU09OLnBhcnNlKHJlcy5ib2R5KS5jb2RlLnNob3VsZC5lcXVhbChjb2RlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc3RvcCB0aGUgc2VydmVyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgaW5qZWN0b3Iuc3RvcCgpO1xuICAgICAgaW5qZWN0b3IgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYoaW5qZWN0b3IpIGF3YWl0IGluamVjdG9yLnN0b3AoKTtcbiAgICB9KTtcbiAgfSk7XG5cbn0pO1xuXG5cbiIsIigkX19wbGFjZWhvbGRlcl9fMCA9IHJlcXVpcmUoJF9fcGxhY2Vob2xkZXJfXzEpLFxuICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiAmJiAkX19wbGFjZWhvbGRlcl9fMy5fX2VzTW9kdWxlICYmICRfX3BsYWNlaG9sZGVyX180IHx8IHtkZWZhdWx0OiAkX19wbGFjZWhvbGRlcl9fNX0pIiwiXG4gICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID1cbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzFbXG4gICAgICAgICAgICAgICAgICAgICAkdHJhY2V1clJ1bnRpbWUudG9Qcm9wZXJ0eShTeW1ib2wuaXRlcmF0b3IpXSgpLFxuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAhKCRfX3BsYWNlaG9sZGVyX18zID0gJF9fcGxhY2Vob2xkZXJfXzQubmV4dCgpKS5kb25lOyApIHtcbiAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNTtcbiAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNjtcbiAgICAgICAgfSIsInJldHVybiAkX19wbGFjZWhvbGRlcl9fMChcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzEsIHRoaXMpOyIsIiR0cmFjZXVyUnVudGltZS5hc3luY1dyYXAiLCJmdW5jdGlvbigkY3R4KSB7XG4gICAgICB3aGlsZSAodHJ1ZSkgJF9fcGxhY2Vob2xkZXJfXzBcbiAgICB9IiwiUHJvbWlzZS5yZXNvbHZlKCRfX3BsYWNlaG9sZGVyX18wKS50aGVuKFxuICAgICAgICAgICRjdHguY3JlYXRlQ2FsbGJhY2soJF9fcGxhY2Vob2xkZXJfXzEpLCAkY3R4LmVycmJhY2spO1xuICAgICAgICAgIHJldHVybjsiLCJyZXR1cm4gJGN0eC5lbmQoKSIsIiRjdHgudmFsdWUiLCIkY3R4LnN0YXRlID0gKCRfX3BsYWNlaG9sZGVyX18wKSA/ICRfX3BsYWNlaG9sZGVyX18xIDogJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgIGJyZWFrIl19
