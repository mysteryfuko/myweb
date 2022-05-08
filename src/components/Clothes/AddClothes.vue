<template>
<div style="text-align: right;" v-if="permissions.admin"><el-button @click="addTagVisit = true">新增衣服</el-button></div>
    <el-dialog v-model="addTagVisit" title="新增衣服" width="400px">
        <el-form>
            <el-form-item label="衣服名称" label-width="80px">
                <el-input autocomplete="off" v-model="newData.name" />
            </el-form-item>
            <el-form-item label="衣服颜色" label-width="80px">
                <el-input autocomplete="off" v-model="newData.color" />
            </el-form-item>
            <el-form-item label="衣服描述" label-width="80px">
                <el-input autocomplete="off" v-model="newData.des" />
            </el-form-item>
            <el-form-item label="衣服评价" label-width="80px">
                <el-rate v-model="newData.rate" allow-half />
            </el-form-item>
            <el-form-item label="对比项" label-width="80px" >
                <el-select v-model="newData.compare" class="m-2" placeholder="Select" size="large">
                    <el-option v-for="item in ListData" :key="item.id" :label="item.name" :value="(item.id as number)" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addTagVisit = false">取消</el-button>
                <el-button type="primary" @click="addTag">新增</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { BlogTag, postData,clothesItems } from '../../util/http'
import Bus from '../../Bus'
import {User} from '../../store'

const props = defineProps<{
    ListData: clothesItems[]
}>()

const compare=ref<number>(0)
const permissions = User()
const newData = ref<clothesItems>({
    name:'',
    color:'',
    des:'',
    rate:0,
    compare:0
})
const addTagVisit = ref<boolean>(false)


const addTag = () => {
    let data = {
        action: 'add',
        where: 'clothes',
        data: newData.value,
    }
    postData(data).then((res) => {
        if (res) {
            alert('添加成功')
            addTagVisit.value = false
            Bus.emit('addClothes')
        }
    })
}

</script>

<style scoped>
.el-menu-item {
    --el-menu-text-color: #fff;
}
</style>