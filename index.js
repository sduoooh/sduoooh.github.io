import { ref } from "/littleVue.js"
   
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
