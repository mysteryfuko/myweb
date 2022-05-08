<template>
    <el-menu-item @click="addTagVisit = true" v-if="permissions.admin" index="addNewTag">新增标签</el-menu-item>
    <el-dialog v-model="addTagVisit" title="新增标签" width="400px">
        <el-form>
            <el-form-item label="标签名" label-width="80px">
                <el-input autocomplete="off" v-model="newTagName" />
            </el-form-item>
            <el-form-item label="是否子菜单" label-width="120px">
                <el-switch v-model="isChild" />
            </el-form-item>
            <el-form-item label="所属标签" label-width="80px" v-if="isChild">
                <el-select v-model="newTagBelong" class="m-2" placeholder="Select" size="large">
                    <el-option v-for="item in props.list" :key="item.id" :label="item.name" :value="item.id" />
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
import { BlogTag, postData } from '../../util/http'
import Bus from '../../Bus'
import {User} from '../../store'

const permissions = User()
const isChild = ref<boolean>(false)
const newTagBelong = ref<number>(1)
const newTagName = ref<string>('')
const addTagVisit = ref<boolean>(false)
const props = defineProps<{
    list: BlogTag[]
}>()

const addTag = () => {
    let data = {
        action: 'add',
        where: 'blogtag',
        data: {
            name: newTagName.value,
            belong: 0
        }
    }
    if (isChild.value) {
        data.data.belong = newTagBelong.value
    }
    postData(data).then((res) => {
        if (res) {
            alert('添加成功')
            addTagVisit.value = false
            Bus.emit('addTag')
        }
    })
}

</script>

<style scoped>
.el-menu-item {
    --el-menu-text-color: #fff;
}
</style>