import { ref } from "/littleVue.js"
   
let a = document.getElementById('app')
const clickEvent = () => {
  if (a) {
    a.innerHTML = parseInt(a.innerHTML) + 1
  }
}


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

const ok = ref(0, {
      address: 'app1',
      function: (value) => {
        return value
      }
    })

    ok.source = {
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
    
    
    ok2.source = {
      address: 'ans',
      function: (value) => {
        return value + ok.value
      }
    }
    
    
    ok.source = {
      address: 'ans',
      function: (value) => {
        return value + ok2.value
      }
    }
