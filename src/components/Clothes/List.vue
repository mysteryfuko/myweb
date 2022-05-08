<template>
    <div>
        <add-clothes :ListData="data || []" />
        <el-card v-for="item in data">
            <template #header>
                <div class="card-header">
                    <span>{{ item.name }}</span>
                </div>
            </template>
            <el-row>
                <el-col>
                    颜色：{{ item.color }}
                </el-col>
                <el-col>
                    描述：{{ item.des }}
                </el-col>
                <el-col v-if="item.compare">
                    对比项：
                    <el-popover placement="bottom" title="对比项" :width="200" trigger="click">
                        <template #reference>
                            <el-button>{{ getData(item.compare).name }}</el-button>
                        </template>
                        <el-row>
                            <el-col>名称：{{ getData(item.compare).name }}</el-col>
                            <el-col>颜色：{{ getData(item.compare).color }}</el-col>
                            <el-col>描述：{{ getData(item.compare).des }}</el-col>
                            <el-col>
                                <el-rate v-model="getData(item.compare).rate" allow-half disabled />
                            </el-col>
                        </el-row>
                    </el-popover>
                </el-col>
                <el-col>
                    <el-rate v-model="item.rate" allow-half disabled />
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import AddClothes from './AddClothes.vue'
import { getClothes, clothesItems } from '../../util/http'
import Bus from '../../Bus'

const getData = (id: number): clothesItems => {
    let res={} as clothesItems
        (data.value as clothesItems[]).forEach((item:clothesItems) => {
        if (item.id === id) {
            res = item
        }
    })
    return res
}

const data = ref<clothesItems[]>()
onMounted(() => {
    getClothes().then((res) => {
        data.value = res
    })
})
Bus.on('addClothes', () => {
    getClothes().then((res) => {
        data.value = res
    })
})
</script>

<style scoped>
.el-col {
    font-size: medium;
    font-weight: 400;
}
</style>