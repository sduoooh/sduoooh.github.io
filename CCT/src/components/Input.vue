<script setup>
import { ref } from "vue"
import { range } from 'lodash'
import { help } from '../data'

const value = ref([0,0,0])

const list = ref([[],[],[]])

const result = ref([])

const emit = defineEmits(['update'])

const noti1 = () => {
    ElNotification.success({
        title: '等候多时',
        message: '罗盘计算完成',
        showClose: false,
    })
}

const noti2 = (mess) => {
    ElNotification.error({
        title: '一个不好的消息',
        message: mess,
        showClose: false,
    })
}

const compute = async() => {
    
    
    if (value.value.filter(element => element !== 0).length < 2){
        noti2('至多只能有一个罗盘初始距离为0')
        return
    }

    list.value = [[],[],[]]
    result.value = []

    const loading = ElLoading.service({
        lock: true,
        text: '计算中...'
    })

    await tryCompute()
    .then (() => {
        loading.close()
        emit('update',[true, value.value, list.value,result.value]) // 第一个数组为初始输入的罗盘距离，第二个数组为各罗盘的计算结果，第三个数组为得到的罗盘操作数
        noti1()
    })
    .catch (err => {
        loading.close()
        console.log(err)
        emit('update', [false, value.value, list.value,result.value])
        noti2(err.message)
    })
}

const tryCompute = () => new Promise ((resolve, reject) => {
    try {
        getCount()
    }
    catch (err) {
        if (err.message === "该条件下无更多解"){
            return resolve()
    }
        else {
            return reject(err.message)
        }
    }
    try {
        getWay()
    }
    catch (err) {
        if (err.message === "该条件下无更多解"){
            return resolve()
        }
        else {
            return reject(err.message)
        }
    }
    return resolve()
})

const getCount = () => {
    let a = value.value
    for (let i in range(30)){
        let big = (6 * i + a[0]) / 4
        let mid = (6 * i + a[1]) / 3
        let sma = (6 * i + a[2])
        if (!(big % 1 || big > 20)){
            list.value[0].push(big)
        }
        if (!(mid % 1 || mid > 20)){
            list.value[1].push(mid)
        }
        if (!(sma % 1 || sma > 20)){
            list.value[2].push(sma)
        }
    }
    if (list.value[0].length === 0 || list.value.filter(element => element !== []).length < 2){
        throw new Error('该条件下无更多解')
    }
    return 
}

const getWay = () => {
    for (let i in range(list.value[0].length)){
        for (let j in range(list.value[1].length)){
            if (list.value[1][j] >= list.value[0][i]) break
            for (let k in range(list.value[2].length)){
                if (list.value[1][j] + list.value[2][k] > list.value[0][i]) break
                if (list.value[1][j] + list.value[2][k] === list.value[0][i]){
                    result.value.push([list.value[1][j], list.value[2][k], 0])
                }
            }
        }
    }
    if (result.value.length === 0){
        throw new Error('该条件下无更多解')
    }
    console.log(result.value)
    result.value.sort(function(a, b){return a.reduce((a,b)=>{return a+b}) - b.reduce((a,b)=>{return a+b})})
    return
}
</script>
<template>
    <div h="10vh" w="100vw" item-center justify-center flex>
        <div flex>
            <div grow flex m-5>
                <span>外围罗盘距离：</span>
                <CheckInput @update:value="i => value[0] = i"  />
            </div>
            <div grow flex m-5>
                <span>中间罗盘距离：</span>
                <CheckInput @update:value="i => value[1] = i"  />
            </div>
            <div grow flex m-5>
                <span>内层罗盘距离：</span>
                <CheckInput @update:value="i => value[2] = i"  />
            </div>
            <div grow flex m-5>
                <el-button @click="compute">开始计算</el-button>
            </div>
            <div>
                <div text="gray xs" m-5>说明：
                    <el-switch v-model="help" class="ml-1"
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
                </div>
            </div>
        </div>
    </div>
</template>