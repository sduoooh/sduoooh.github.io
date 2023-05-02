<script setup>
import { ref } from 'vue'
import { test1, test2 } from '../data'

const emit = defineEmits(['update:value'])

const num = ref(0)
const mem = ref(0)

const checkInput = () => {
    if (test1.test(num.value)) {
        if (num.value !== "") {
            if (isNaN(num.value * 1)) {
                num.value = mem.value
            } else {
                num.value *= 1
                mem.value = num.value
            }
        } else if (num.value === "") {
            mem.value = 0
        }
    } else {
        num.value = mem.value
    }


    console.log(mem.value, num)
}
const checkBlur = () => {
    if (!test2.test(num.value)) {
        num.value = mem.value
    } else if (num.value === "") {
        num.value = mem.value
    }
    emit('update:value', num.value)
}
</script>

<template>
    <div>
        <el-input v-model="num" @blur="checkBlur" @input="checkInput"></el-input>
    </div>
</template>