<template>
<div style="text-align: right;" v-if="permissions.admin"><el-button @click="NewBlog">新增文章</el-button></div>
    <div v-infinite-scroll="load" :infinite-scroll-disabled="isLoad" >
        <el-card shadow="hover" v-for="item in List" @click="handleClick(item.title, 'BlogRead-' + item.id, item.id)">
            <template #header>
                <div class="card-header">
                    <span>{{ item.title }}</span>
                </div>
            </template>
            <div class="item">
                <md-editor v-model="item.content" :previewOnly="true" :markedHeading="markedHeading" />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { Blog, getBlogList } from '../../util/http'
import Bus from '../../Bus'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {User} from '../../store'

const permissions = User()
const props = defineProps<{
    id: number,
    name:string
}>()

const markedHeading = (text: string, level: number, raw: string) => {
    return `<h${level} id="${raw}">${text}</h${level}>`;
}
const load = () => {
    getList()
    page.value++   
}

const NewBlog = () => {
    Bus.emit('NewBlog', { title: '新建文章', key: 'newBlog', id: props.id })
}
const page = ref<number>(1)
const isLoad = ref<boolean>(false)
const List = ref<Blog[]>([])
const handleClick = (title: string, key: string, id: number) => {
    Bus.emit('BlogListClick', { title: title, key: key, id: id })
}
const getList = (): void => {
    getBlogList(props.id, page.value).then((res) => {
        if (res.length > 0) {
            List.value = [...List.value, ...res]
        } else {
            isLoad.value = true
        }
    })
}

</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.item {
    font-size: 14px;
    height: 100px;
}

.el-card {
    margin-bottom: 10px;
    height: 300px;
}
</style>