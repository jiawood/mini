const _ = {
  isNull: function (val) {
    if (val === null) {
      return true;
    } else {
      return false;
    }
  },
  isNaN: function (val) {
    if (typeof val === "object") {
      return val.toString() === "NaN";
    } else {
      return val !== val;
    }
  },

  //根据给定的长度切分数组
  chunk: function (arr, size = 1) {
    let res = [];
    let n = arr.length;
    while (n > size) {
      res.push(arr.slice(0, size));
      n -= size;
      arr = arr.slice(size);
    }
    res.push(arr);
    return res;
  },
  //过滤掉为空的数
  compact: function (arr) {
    return arr.filter((a) => a);
  },
  //拼接数组
  concat: function (arr, ...values) {
    return arr.concat(...values);
  },

  //difference  寻找不同数组中的交集
  difference: function (arr, ...args) {
    let map = {};
    for (let i = 0; i < args.length; i++) {
      for (let j = 0; j < args[i].length; j++) {
        if (map[args[i][j]] === undefined) {
          map[args[i][j]] = 1;
        }
      }
    }
    const res = [];
    for (let i of arr) {
      if (map[i] != 1) {
        res.push(i);
      }
    }
    return res;
  },

  //drop 丢掉前n个数
  drop: function (arr, n = 1) {
    return arr.slice(n);
  },

  //drop 丢掉后n个数
  dropRight: function (arr, n = 1) {
    if (n === 0) {
      return arr;
    } else {
      return arr.slice(0, -n);
    }
  },
  //fill 根据start和end对原数组进行填充
  fill: function (arr, str, start = 0, end = arr.length) {
    for (let i = start; i < end; i++) {
      arr[i] = str;
    }
    return arr;
  },
  // flatten 将数组中第一层数组展开
  flatten: function (arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      res = res.concat(arr[i]);
      //res = res.push(...arr[i])
    }
    return res;
  },
  //flattenDeep 深度展开
  flattenDeep: function (arr) {
    function helper(arr, res) {
      for (let i of arr) {
        if (!Array.isArray(i)) {
          res.push(i);
        } else {
          helper(i, res);
        }
      }
      return res;
    }
    return helper(arr, []);
  },
  //head 头
  head: function (arr) {
    return arr[0];
  },
  //indexOf
  indexOf: function (arr, val, fromIndex = 0) {
    let n = arr.length;
    if (fromIndex < 0 && n > -fromIndex) {
      fromIndex = n + fromIndex;
    } else if (n <= -fromIndex) {
      fromIndex = 0;
    }
    for (let i = fromIndex; i < arr.length; i++) {
      if (arr[i] == val || (this.isNaN(arr[i]) && this.isNaN(val))) {
        return i;
      }
    }
    return -1;
  },
  //inital 除了最后一个
  initial: function (arr) {
    return arr.slice(0, arr.length - 1);
  },
  join: function (arr, sep = ",") {
    let res = "";

    for (let i of arr) {
      res += i + String(sep);
    }
    return res.slice(0, res.length - 1);
  },
  last: function (arr) {
    return arr[arr.length - 1];
  },
  nth: function (arr, n) {
    if (n >= 0) {
      return arr[n];
    } else {
      return arr[arr.length + n];
    }
  },
  //sortedIndex二分查找
  sortedIndex: function (arr, val) {
    let l = 0;
    let r = arr.length - 1;
    while (l < r) {
      let mid = (l + r) >> 1; //右中位数
      if (arr[mid] < val) {
        l = mid + 1;
      } else {
        r = mid;
      }
    }
    return l;
  },
  tail: function (arr) {
    arr.shift();
    return arr;
  },
  //unzip
  unzip: function (arr) {
    let n = arr.length;
    let res = new Array(arr[0].length);
    for (let i = 0; i < arr[0].length; i++) {
      res[i] = [];
      for (let j = 0; j < n; j++) {
        res[i].push(arr[j][i]);
      }
    }
    return res;
  },
  //size  长度
  size(value) {
    if (value instanceof Array || typeof value === "string") {
      return value.length;
    } else if (value instanceof Object) {
      let num = 0;
      for (let i in value) {
        num++;
      }
      return num;
    }
  },
  //ciel 向上取整 但是增加了精度
  ciel(val, precision = 0) {
    return Math.ciel(val * Math.pow(10, precision)) / Math.pow(10, precision);
  },
  zip(...Arys) {
    let n = Arys.length;
    let maxLength = 0;
    for (let i = 0; i < n; i++) {
      maxLength = Math.max(maxLength, Arys[i].length);
    }
    let m = maxLength;
    let res = Array.from(Array(m), () => new Array());
    // let res = new Array.fill(() =>[])
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        res[i].push(Arys[j][i]);
      }
    }
    return res;
  },
  //countBy  通过后面输入的函数计数
  countBy(collecton, func) {
    let map = {};
    for (let i in collecton) {
      if (typeof func === "function") {
        let key = func(collecton[i]);
        if (map[key] === undefined) {
          map[key] = 1;
        } else {
          map[key]++;
        }
      }
      if (typeof func === "string") {
        let key = collecton[i][func];
        if (map[key] === undefined) {
          map[key] = 1;
        } else {
          map[key]++;
        }
      }
    }
    return map;
  },

  //get 找到对象里面的值，path是路径，路径有几种不同的表示方法
  // def 是默认值
  get(obj, path, def) {
    let reg = /\w+/g;
    let arr = [];
    if (typeof path === "string") {
      arr = path.match(reg);
    } else {
      arr = path;
    }
    for (let i of arr) {
      if (obj[i]) {
        obj = obj[i];
      } else {
        return def;
      }
    }
    return obj;
  },

  //makeF辅助函数，将输入是predicate的函数抽成一个函数，便于处理
  //相关函数。
  makeF(predicate) {
    if (typeof predicate === "function") {
      return predicate;
    } else if (typeof predicate === "string") {
      return function (object) {
        return xiaojaja.get(object, predicate);
      };
    } else if (Array.isArray(predicate)) {
      return function (object) {
        let res = true;
        for (let i = 0; i < predicate.length - 1; i = i + 2) {
          let j = i + 1;
          let path = predicate[i];
          let value = predicate[j];
          res = res && xiaojaja.get(object, path) === value;
        }
        return res;
      };
    } else if (typeof predicate === "object") {
      return function (object) {
        for (let i in predicate) {
          if (object[i] !== predicate[i]) {
            return false;
          }
        }
        return true;
      };
    } else {
      return;
    }
  },
  // every
  every(collection, pred) {
    let f = this.makeF(pred);
    for (let i in collection) {
      if (!f(collection[i])) {
        return false;
      }
    }
    return true;
  },

  //filter
  filter(collection, pred) {
    let f = this.makeF(pred);
    for (let i of collection) {
      if (f(i)) {
        return i;
      }
    }
    return;
  },

  //sample 随机取数组中的一个数或者对象中的一个元素
  sample(collection) {
    let keys = Object.keys(collection);
    return collection[keys[Math.floor(Math.random() * keys.length) | 0]];
  },

  //sample 按照size随机采样
  /**
   *
   * @param {Array|Object} col {number} size
   * @returns random Array
   */
  sampleSize(col, size) {
    let n = Object.keys(col).length;
    if (size > n) size = n;
    let res = [];
    for (let i = 0; i < size; i++) {
      let keys = Object.keys(col);
      let randomKey = Math.floor(Math.random() * keys.length);
      res.push(col[keys[randomKey]]);
      delete col[keys[randomKey]];
    }
    return res;
  },

  //shuffle 重新洗牌 跟上面的代码一样
  shuffle(col) {
    let n = Object.keys(col).length;
    let res = [];
    for (let i = 0; i < n; i++) {
      let keys = Object.keys(col);
      let randomKey = Math.floor(Math.random() * keys.length);
      res.push(col[keys[randomKey]]);
      delete col[keys[randomKey]];
    }
    return res;
  },

  //isArray
  isArray(val) {
    return Object.prototype.toString.call(val) == "[object Array]";
  },
  isArrayBuffer(val) {
    return Object.prototype.toString.call(val) == "[object ArrayBuffer]";
  },
  isArrayLike(val) {
    return (
      !this.isNull(val) &&
      typeof val != "function" &&
      val.length != undefined &&
      val.length >= 0 &&
      val.length < Number.MAX_SAFE_INTEGER
    );
  },
  isArrayLikeObject(val) {
    return this.isArrayLike(val) && typeof val === "object";
  },
  isBoolean(val) {
    return Object.prototype.toString.call(val) == "[object Boolean]";
  },
  isDate(val) {
    return Object.prototype.toString.call(val) == "[object Date]";
  },
  //isFinite
  isFinite(val) {
    if (typeof val !== "number" || this.isNaN(val)) return false;
    return val >= Number.MIN_VALUE && val <= Number.MAX_VALUE;
  },
  isFunction(val) {
    return typeof val === "function";
  },
  isNil(val) {
    return val == null;
  },
  assign(...object) {
    const res = {};
    for (let i in object) {
      for (let j in object[i]) {
        if (object[i].hasOwnProperty(j)) {
          res[j] = object[i][j];
        }
      }
    }
    return res;
  },
  range(start = 0, end, step = 1) {
    let res = [];
    if (arguments.length === 1) {
      end = start;
      start = 0;
    }
    if (step === 0) {
      for (let i = start; i < end; i++) {
        res.push(start);
      }
    }
    if (step > 0) {
      while (start < end) {
        res.push(start);
        start += step;
      }
    }
    if (step < 0) {
      while (start > end) {
        res.push(start);
        start += step;
      }
    }
    return res;
  },
  //defaults
  defaults(...sourses) {
    let res = {};
    for (let sourse of sourses) {
      for (let i in sourse) {
        if (res[i] == undefined) {
          res[i] = sourse[i];
        }
      }
    }
    return res;
  },
  //invert 把一个对象 键和值 对换  后面出现的覆盖前面的
  invert(obj) {
    let res = {};
    for (let i in obj) {
      res[obj[i]] = i;
    }
    return res;
  },
  //keys 返回keys
  keys(object) {
    const res = [];
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        res.push(key);
      }
    }
    return res;
  },
  //omit 删除部分属性
  omit(obj, arr) {
    obj = obj;
    for (let key in obj) {
      if (arr.indexOf(key) > -1) {
        delete obj[key];
      }
    }
    return obj;
  },
  //getPath 获得路径的数组，
  getPath(path) {
    if (Array.isArray(path)) {
      return path;
    }
    let reg = /\w+/g;
    return path.match(reg);
  },
  set(obj, path, def) {
    path = this.getPath(path);
    let tep = obj;
    for (let i of path) {
      if (!tep[i]) {
        tep[i] = {};
      }
      tep = tep[i];
    }
    tep = def;
    return obj;
  },
  value(obj) {
    return Object.values(obj);
  },
  camelCase(str) {
    str = str.toLowerCase();
    let arr = str.match(/[a-z]+/g);
    let res = "";
    for (let i in arr) {
      if (i === "0") {
        res += arr[i];
      } else {
        res += arr[i][0].toUpperCase() + arr[i].slice(1);
      }
    }
    return res;
  },
  capitalize(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  },
  endsWith(str, val, end = str.length) {
    return str[end - 1] === val;
  },
  escape(str) {
    let reg = /[&<>"']/g;
    let map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return str.replace(reg, (e) => map[e]);
  },
  kebabCase(str) {
    let arr = str.match(/([a-z]+|[A-Z][a-z]+|[A-Z]+)/g);
    arr = arr.map((e) => e.toLowerCase());
    return arr.join("-");
  },
  lowerCase(str) {
    let arr = str.match(/([a-z]+|[A-Z][a-z]+|[A-Z]+)/g);
    arr = arr.map((e) => e.toLowerCase());
    return arr.join(" ");
  },
  snakeCase(str) {
    return this.lowerCase(str).split(" ").join("_");
  },
  lowerFirst(str) {
    return str[0].toLowerCase() + str.slice(1);
  },
  //padStart 向前填充
  padStart(string = " ", len = 0, chars = "  ") {
    let n = string.length;
    let padLength = len - n;
    let charsLength = chars.length;
    if (padLength <= 0) return string;
    let padCount = (padLength / charsLength) | 0;
    let padRest = padLength % charsLength;
    let res = "";
    while (padCount) {
      res += chars;
      padCount--;
    }
    res += chars.slice(0, padRest);
    res += string;
    return res;
  },
  padEnd(string = " ", len = 0, chars = "  ") {
    let n = string.length;
    let padLength = len - n;
    let charsLength = chars.length;
    if (padLength <= 0) return string;
    let padCount = (padLength / charsLength) | 0;
    let padRest = padLength % charsLength;
    let res = string;
    while (padCount) {
      res += chars;
      padCount--;
    }
    res += chars.slice(0, padRest);
    return res;
  },
  pad(string = " ", len = 0, chars = "  ") {
    let left = ((len - string.length) / 2) | 0;
    let right = len - left;
    return this.padStart(string, left, chars) + this.padEnd("", right, chars);
  },
  //将字符串转化为任意进制的整数
  parseInt(string, radix = 10) {
    return Number(string).toString(radix) * 1;
  },
  repeat(str = " ", n = 1) {
    let res = "";
    while (n) {
      res += str;
      n--;
    }
    return res;
  },
  replace(str, pattern, replacement) {
    let res = "";
    let reg = new RegExp(pattern, "g");
    reg.lastIndex = 0;
    let start = 0;
    while (reg.lastIndex != null) {
      let arr = reg.exec(str);
      if (!arr) break;
      if (arr) {
        let end = arr.index;
        for (let i = start; i < end; i++) {
          res += str[i];
        }
        res += replacement;
        start += end + pattern.length;
      }
    }
    res += str.slice(start);
    return res;
  },
  //split  以某个特定的字符串将字符串分成小段，并以列表的形式显示
  // 第三个参数表示最大的数组长度,因为与replace的思路类似，故取巧
  split(string = "", separator, limit) {
    if (!string) return "";
    return string.split(separator).slice(0, limit);
  },
  startCase(str) {
    let res = str.match(/([A-Z][a-z]+|[A-Z]+|[a-z]+)/g);
    res = res.map((e) => e[0].toUpperCase() + e.slice(1));
    return res.join(" ");
  },
  startsWith(str, start, position = 0) {
    return str[position] === start;
  },
  toLower(str) {
    return str.toLowerCase();
  },

  //before
  before(n, func) {
    let i = 0;
    let result;
    return function (...args) {
      if (i < n) {
        i++;
        result = func(...args);
      }
      return result;
    };
  },

  //ary 返回前n个参数，多余的参数删除
  ary(func, n = func.length) {
    return function (...args) {
      return func(...args.slice(0, n));
    };
  },
  //unary 只接受一个参数，多余的参数都删除
  unary(func) {
    return function (ary) {
      return func(ary);
    };
  },
  //flip 会把参数反转
  flip(func) {
    return function (...args) {
      return func(...args.reverse());
    };
  },
  //negate 返回新的否定过的函数
  negate(func) {
    return function (...args) {
      return !func(...args);
    };
  },
  //spread
  spread(func) {
    return function (ary) {
      return func(ary);
    };
  },
  //bind  _选择填充的值
  // bind(f, ...fixedArgs) {
  //   return function bound(...args) {
  //     let copy = fixedArgs.slice();
  //     let j = 0;
  //     for (let i = 0; i < copy.length; i++) {
  //       if (copy[i] == "_") {
  //         copy[i] = args[j++];
  //       }
  //     }
  //     while (j < args.length) {
  //       copy.push(args[j++]);
  //     }
  //     return f(...copy);
  //   };
  // },
  //iteratee 将predicate转换
  iteratee(predicate) {
    if (typeof predicat == "string") {
      predicate = this.property(predicate);
    }

    if (typeof predicate == "object") {
      predicate = this.matches(predicate);
    }
    if (Array.isArray(predicate)) {
      predicate = this.matchesProperty(predicate);
    }
    return predicate;
  },
  //property
  property(str) {
    return function (obj) {
      return obj[str];
    };
  },
  //matches
  matches(target) {
    return function (obj) {
      for (let key in target) {
        if (target[key] != obj[key]) {
          return false;
        }
      }
      return true;
    };
  },
  //matchesProperty
  matchesProperty(ary) {
    return this.matches(this.fromPairs(this.chunk(ary, 2)));
  },
  //fromParis 将[[1,2][3,4]] 转换为 {1:2,3:4}
  fromPairs(ary) {
    let res = new Map();
    for (let item of ary) {
      res.set(item[0], item[1]);
    }
    return res;
  },
  bind(func,thisArg,...args){
    return function(...args2){
      return func.apply(thisArg,...args,...args2)
    }
  },
  //防抖,就是不要让函数频繁的触发。在一个事件触发的n秒后再执行，不管你触发多少次
  //总是要在事件停止n秒之后再触发,很简单,就是使用setTimeout让函数延迟执行
  //如果函数再次运行，则清除之前延迟执行的任务。
  //setTimeout 即使清除了之后 那个timeout id 也一直都存在
  //es6不能改变参数的值，所以Immediate的值不能改变，需要在函数执行开始之前就执行一遍函数
  debounce(func,await,immediate=false){
    let timeout
    //这儿不能用箭头函数，如果用箭头函数的话，this就指向lodash了，草
    return function(...args) {
      let callNow = immediate && !timeout
      if(callNow){
        func.call(this,...args)
      }
      if(timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        timeout = null
        func.call(this,...args)
      },await)
    }
  },
  //节流，持续地触发事件，每隔一段时间，只执行一次事件,可以使用时间戳
  //使用时间戳的代码是刚开始就会执行一次
  throttle1(func,await){
    let previous = 0
    return function(...args){
      let now = +new Date()
      if(now - previous > await){
        func.apply(this,args)
        previous = now
      }
    }
  },
  //使用定时器,是时间过了await之后，然后再执行一次
  throttle2(func,await){
    let timeout
    return function(...args){
      if(!timeout){
        timeout = setTimeout(() => {
          func.apply(this,args)
          timeout = null
        },await)
      }
    }
  }
  //支持
};
