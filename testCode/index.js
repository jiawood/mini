let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]

const getChildren = (data,res,pid) => {
  for(const item of data){
    if(item.pid === pid){
      const newItem = {...item,children:[]}
      res.push(newItem)
      getChildren(data,newItem.children,item.id)
    }
  }
}

const arrayToTree = (data,pid) => {
  const res = []
  getChildren(data,res,pid)
  return res 
}

console.log(JSON.stringify(arrayToTree(arr,0),null,' '))

// 第二种方法可以成功的关键在于引用对象指向的是同一个
function arrayToTree1(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  // 
    
  // 先转成map存储
  for (const item of items) {
    itemMap[item.id] = {...item, children: []}
  }
  
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;
    const treeItem =  itemMap[id];
    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}

arrayToTree1(arr)