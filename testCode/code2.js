let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
  { id: 6, name: "部门6", pid: 0 },
]

// 关键是要搞明白引用数据类型，共用用一份地址

function getChildren(data,res,pid){
  for(const item of data){
    if(item.pid === pid){
      const newItem = {...item, children:[]}
      res.push(newItem)
      getChildren(data,newItem.children,item.id)
    }
  }
}

function getTree(arr){
  let res = []
  getChildren(arr,res,0)
  console.log(JSON.stringify(res,null,2))
  return res 
}

// getTree(arr)

// 引用对象指向的是同一片内存地址

function getTree2(arr){
  const mapTree = {}
  for(const item of arr){
    mapTree[item.id] = {...item,children:[]}
  }
  const res = []
  for(let i = 0; i < arr.length; i++){
    const item = arr[i]
    const {id,pid} = item 
    const treeItem = mapTree[id]
    if(pid === 0){
      res.push(treeItem)
    }else{
      mapTree[item.pid].children.push(mapTree[item.id])
    }
  }
  console.log(JSON.stringify(res,null,2))
  return res 
}

getTree2(arr)