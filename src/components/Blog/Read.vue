<template>
{{BlogData?.title}}   <div style="float:right;font-size: 14px;padding-right: 20%;" v-if="permissions.admin" @click="hanleEdit">编辑</div>
<el-divider />
    <div class="item">
        <md-editor v-model="content" :previewOnly="true" :markedHeading="markedHeading"/>
    </div>
</template>

<script setup lang="ts">

import { Blog, getBlog } from '../../util/http'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css'; 
import Bus from '../../Bus'
import {User} from '../../store'

const permissions = User()
const props = defineProps<{
    id: number,
    name:string
}>()

const hanleEdit = () => {
    Bus.emit('NewBlog', { title: '编辑文章', key: 'editBlog', id: props.id })
}
const BlogData = ref<Blog>()
const content = ref<string>('')

onMounted(() => {
    getBlog(props.id).then((res) => {
        BlogData.value = res
        content.value =BlogData.value.content;
    })
})
const markedHeading = (text: string, level: number, raw: string) => {
    return `<h${level} id="${raw}">${text}</h${level}>`;
}
</script>

<style scoped>
</style>