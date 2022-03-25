const fs = require("fs");

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const { transformFromAst } = require("babel-core");
const path = require("path");

module.exports = {
  // 解析我们的代码生成ast
  getAST: (path) => {
    const source = fs.readFileSync(path, "utf-8");

    return parser.parse(source, {
      sourceType: "module",
    });
  },

  // 对ast节点进行递归遍历
  getDependencies: (ast) => {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      },
    });
    return dependencies;
  },

  // 将获得的es6的ast转化成es5
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ["env"],
    });
    return code;
  },
};
