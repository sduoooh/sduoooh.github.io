<script setup>
import { ref } from 'vue'
import { range } from 'lodash'
import { InfoFilled } from '@element-plus/icons-vue'
import Input from './components/Input.vue'

import { help } from './data'

const activeNames = ref(['1'])

const computed = ref(false)

const input = ref([0, 0, 0])

const list = ref([])

const result = ref([])

</script>

<template>
    <div>
        <div h="10vh" w="100vw" item-center justify-center flex>
            <div item-center justify-center flex flex-col>
                <div font-900>星铁 · 兆算引航罗盘</div>
            </div>
        </div>
    </div>


    <Input @update="i => {
        computed = i[0]
        input = i[1]
        list = i[2]
        result = i[3]
    }" />


    <div>
        <div flex flex-col item-center justify-center>
            <div width="100vw" flex item-center justify-center>
                <div flex flex-col w="80vw">
                    <div v-if="help" flex item-center justify-center>
                        <div text="gray xs" m-5>
                            <p>原理说明： </p>
                            <p>操作罗盘转至目标方向，视作将一个模6存在余数的数进行以单位转动距离为步长的增减，使其模6为零的过程；</p>
                            <p>通过对其当前设定状态所对应公式的范围内遍历，得到各自操作数，而后综合进行判断即可。</p>
                            <br />
                            <p>使用说明： </p>
                            <p>距离意为对应罗盘以顺时针方向旋转，至与目标重合所需最小转次；</p>
                            <p>输入对应罗盘的距离即可，默认计算范围为20步以内。</p>
                            <br />
                            <p>注：该版本下计算基于确定的状态设置，并且判断时默认不进行单一罗盘的转动及中间罗盘与内层罗盘的联合操作。后续或将更新，敬请期待。</p>
                        </div>
                    </div>

                    <el-collapse v-if="computed" accordion v-model="activeNames">
                        <el-collapse-item name="1">
                            <template #title>
                                <div m-5>
                                    推荐操作
                                    <el-tooltip placement="top">
                                        <template #content> 基于计算结果给出的较优操作。 </template>
                                        <el-icon class="header-icon">
                                            <info-filled />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                            <div flex item-center justify-center>
                                <div flex flex-col v-if="result.length">
                                    <span m-5>将外层罗盘与中间罗盘一起转动 {{ result[0][0] }} 次；</span>
                                    <span m-5>将外层罗盘与内层罗盘一起转动 {{ result[0][1] }} 次；</span>
                                    <span m-5>将中间罗盘与内层罗盘一起转动 {{ result[0][2] }} 次。</span>
                                </div>
                                <div v-else>
                                    <span m-5>范围内无更多需或能匹配的操作。</span>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="2">
                            <template #title>
                                <div m-5>
                                    兆算数据及结果
                                </div>
                            </template>
                            <div flex item-center justify-center>
                                <div flex flex-col>
                                    <br />
                                    <span m-5 flex item-center justify-center><b>罗盘转动次数公式</b></span>
                                    <span m-5>外层罗盘转动次数公式： 4 N = 6 N + {{ input[0] }}</span>
                                    <span m-5>中间罗盘转动次数公式： 3 N = 6 N + {{ input[1] }}</span>
                                    <span m-5>内层罗盘转动次数公式： 1 N = 6 N + {{ input[2] }}</span>
                                    <br />
                                    
                                    <span m-5 flex item-center justify-center><b>罗盘转动次数列表</b></span>
                                    <br/>
                                    <div v-if="list.length" flex-col flex item-center justify-center>
                                        <span m-5>外层罗盘转动次数： {{ list[0] }}</span>
                                        <span m-5>中间罗盘转动次数： {{ list[1] }}</span>
                                        <span m-5>内层罗盘转动次数： {{ list[2] }}</span>
                                        <br />

                                        <br/>
                                        <span m-5 flex item-center justify-center><b>匹配操作列表</b></span>
                                        <br />
                                        <div flex flex-col v-for="i in range(result.length)" v-if="result.length">
                                            <span m-5>操作{{ i + 1 }}： </span>
                                            <span m-5>将外层罗盘与中间罗盘一起转动 {{ result[i][0] }} 次；</span>
                                            <span m-5>将外层罗盘与内层罗盘一起转动 {{ result[i][1] }} 次；</span>
                                            <span m-5>将中间罗盘与内层罗盘一起转动 {{ result[i][2] }} 次。</span>
                                            <br />
                                        </div>
                                        <div flex flex-col item-center justify-center v-else>
                                            <span m-5>范围内无更多需或能匹配的操作。</span>
                                        </div>
                                    </div>
                                    <div flex flex-col item-center justify-center v-else>
                                        <span m-5>范围内无更多所需或所能进行的转动次数。</span>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
    </div>
</template>