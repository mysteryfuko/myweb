<template>
    <el-menu-item @click="addTagVisit = true" v-if="permissions.admin" index="addNewTag">新增标签</el-menu-item>
    <el-dialog v-model="addTagVisit" title="新增标签" width="400px">
        <el-form>
            <el-form-item label="标签名" label-width="80px">
                <el-input autocomplete="off" v-model="newTagName" />
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
const newTagName = ref<string>('')
const addTagVisit = ref<boolean>(false)


const addTag = () => {
    let data = {
        action: 'add',
        where: 'NavTag',
        data: {
            name: newTagName.value,
        }
    }
    postData(data).then((res) => {
        if (res) {
            alert('添加成功')
            addTagVisit.value = false
            Bus.emit('addNav')
        }
    })
}

</script>

<style scoped>
.el-menu-item {
    --el-menu-text-color: #fff;
}
</style>