<template>
    <el-sub-menu index="Blog">
        <template #title>
            <el-icon :size="14">
                <i-ep-notebook />
            </el-icon>
            <span>记录</span>
        </template>
        <el-sub-menu v-for="item in BlogTag?.tag" :index="'Blog-' + item.id">
            <template #title>{{ item.name }}</template>
            <template v-for="items in BlogTag?.list">
                <el-menu-item :index="'Blog-' + item.id + '-' + items.id" v-if="items.belong == item.id"
                    @click="handleOpen('Blog-'+items.name, 'Blog-' + item.id + '-' + items.id, items.id)">{{ items.name }}
                </el-menu-item>
            </template>
        </el-sub-menu>
        <AddNewTag v-if="!Collapse && BlogTag?.tag" :list="BlogTag?.tag" />

    </el-sub-menu>
</template>

<script setup lang="ts">
import Bus from '../../Bus'
import { getBlogTag, BlogTagData } from '../../util/http'
import AddNewTag from './AddNewTag.vue'
const props = defineProps<{
    Collapse: boolean
}>()

Bus.on('addTag', () => {
    getBlogTag().then((res) => {
        BlogTag.value = res
    })
})

const handleOpen = (title: string, key: string, id: number) => {
    Bus.emit('menuClick', { title: title, key: key, id: id })
}

const BlogTag = ref<BlogTagData>()
onMounted(() => {
    getBlogTag().then((res) => {
        BlogTag.value = res
    })
})


</script>

<style>
.el-menu {
    height: 100%;
    --el-menu-text-color: #fff;
}

.el-menu-item {
    --el-menu-text-color: #fff;
}

.el-sub-menu {
    --el-menu-text-color: #fff;
}
</style>