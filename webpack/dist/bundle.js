(function (modules) {
  function require(fileName) {
    const fn = modules[fileName];
    const module = { exports: {} };
    fn(require, module, module.exports);
    return module.exports;
  }
  require("/Users/xiaojia/github_repository/mini/webpack/src/index.js");
})({
  "/Users/xiaojia/github_repository/mini/webpack/src/index.js": function (
    require,
    module,
    exports
  ) {
    "use strict";

    var _greeting = require("./greeting.js");

    document.write((0, _greeting.greeting)("嘉木"));
  },
  "./greeting.js": function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    exports.greeting = greeting;

    function greeting(name) {
      return "hello" + name;
    }
  },
});
