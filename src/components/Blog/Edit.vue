<template>
    <div>
        <el-input v-model="title" autocomplete="off">
            <template #prefix>
                标题：
            </template>
        </el-input>
        <md-editor v-model="content" :markedHeading="markedHeading" />
        <span>
            <el-button type="primary" @click="handlepost">提交</el-button>
        </span>
    </div>
</template>

<script setup lang="ts">
import { add } from 'lodash';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { getBlog, postData } from '../../util/http';
import Bus from '../../Bus'

const content = ref<string>('')
const title = ref<string>('')
const props = defineProps<{
    id: number,
    name: string
}>()
const handlepost = () => {
    const action = props.name=='editBlog'?'edit':'add'
    postData({ 'action': action, 'where': 'blog', 'data': { 'title': title.value, 'content': content.value,'id':props.id } }).then((res) => {
        if(res){
            alert('提交成功')
            Bus.emit('closeEdit', { key: props.name})
        }
    })
}

const markedHeading = (text: string, level: number, raw: string) => {
    return `<h${level} id="${raw}">${text}</h${level}>`;
}
//push分新建个更新。
onMounted(() => {
    if (props.name == 'editBlog') {
        getBlog(props.id).then((res) => {
            content.value = res.content;
            title.value = res.title;
        })
    }
})
</script>

<style scoped>
</style>