const path = require("path");
const fs = require("fs");
const vm = require("vm"); // 文件执行

function Module(id) {
  this.id = id;
  this.exports = {};
}

function Require(modulePath) {
  let absPathname = path.resolve(__dirname, modulePath);

  // 获取所有后缀名
  const extNames = Object.keys(Module._extensions);
  let index = 0;

  const oldPath = absPathname;
  function findExt(absPathname) {
    if (index === extNames.length) {
      throw new Error("文件不存在");
    }
    try {
      fs.accessSync(absPathname);
      return absPathname;
    } catch (e) {
      const ext = extNames[index++];
      findExt(oldPath + ext);
    }
  }
  // 递归追加后缀名，判断文件是否存在
  absPathname = findExt(absPathname);

  absPathname = findExt(absPathname);

  if (Module._cache[absPathname]) {
    return Module._cache[absPathname].exports;
  }

  const module = new Module(absPathname);

  Module._cache[absPathname] = module;

  tryModuleLoad(module);

  return module.exports;
}

Module.wrapper = [
  "(function(exports, module, Require, __dirname, __filename) {",
  "})",
];

// 定义扩展名，不同的扩展名，加载方式不同，实现js和json
Module._extensions = {
  ".js"(module) {
    const content = fs.readFileSync(module.id, "utf8");
    const fnStr = Module.wrapper[0] + content + Module.wrapper[1];
    const fn = vm.runInThisContext(fnStr);
    fn.call(
      module.exports,
      module.exports,
      module,
      Require,
      _filename,
      _dirname
    );
  },
  ".json"(module) {
    const json = fs.readFileSync(module.id, "utf8");
    module.exports = JSON.parse(json); // 把文件的结果放在exports属性上
  },
};

function tryModuleLoad(module) {
  // 获取扩展名
  const extension = path.extname(module.id);
  // 通过后缀加载当前模块
  Module._extensions[extension](module);
}


// https://juejin.cn/post/6949385808755294245