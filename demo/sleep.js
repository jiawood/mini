

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    },time)
  })
}

async function main(){
  await sleep(3000)
  console.log(23)
}

main()