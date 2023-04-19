class refObjectClass {
      __value = null
      __source = []
      __isRef = true
      constructor(value, source) {
        this.__source.push(source)
        this.__value = value
        this.__isRef = true
      }
    }

    const createRefObject = (value, source) => {
      console.log(value, source)
      if (typeof (value) === 'object' && '__isRef' in value) {
        value = value.value
      }
      return new Proxy(new refObjectClass(value, source), handler)
    }

    const heyx = (source, value) => {
      document.getElementById(source.address).innerHTML = source.function(value)
    }

    const handler = {
      get: (target, key) => {
        if (key !== 'value') {
          console.warn('You should use .value to get the value of ref object')
          throw new Error('You should use .value to get the value of ref object')
        } else {
          return target.__value
        }
      },
      set: (target, key, value) => {
        if (key !== 'value' && key !== 'source') {
          console.warn('You should use .value to set the value of ref object')
          throw new Error('You should use .value to set the value of ref object')
        }
        else {
          if (key === 'source') {
            target.__source.push(value)
          } else {
            target.__value = value
            target.__source.forEach((source) => {
              heyx(source, value)
            })
          }
        }
      }
    }

    export const ref = (value, source) => {
      return createRefObject(value, source)
    }
