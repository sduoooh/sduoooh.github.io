import { ref } from "/littleVue.js"
   
let a = document.getElementById('app')
const clickEvent = () => {
  if (a) {
    a.innerHTML = parseInt(a.innerHTML) + 1
  }
}

document.getElementById('button1').addEventListener('click',clickEvent)


let input1 = 0
let input = document.getElementById('input')
input.addEventListener('input', (e) => {
  if ((/^[0-9]+$/).test(e.target.value)) {
    document.getElementById('app').innerHTML = parseInt(e.target.value)
  }
  else {
    document.getElementById('app').innerHTML = 0
  }
})

const ok1 = ref(0, {
      address: 'app1',
      function: (value) => {
        return value
      }
    })

document.getElementById('button2').addEventListener('click',()=>{
   ok1.value = ok1.value + 1
})

ok1.source = {
      address: 'a',
      function: (value) => {
        return value
      }
    }
    
const ok2 = ref(0, {
      address: 'b',
      function: (value) => {
        return value
      }
    })
    

// 下面这俩是ans的绑定，显然地址和方法不应该绑在数据上，而应该抽出来单独管理。

ok2.source = {
      address: 'ans',
      function: (value) => {
        return value + ok1.value
      }
    }
    
    
    ok1.source = {
      address: 'ans',
      function: (value) => {
        return value + ok2.value
      }
    }
