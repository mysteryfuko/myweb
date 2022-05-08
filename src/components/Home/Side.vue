<template>
    <el-sub-menu index="Home">
        <template #title>
            <el-icon :size="14">
                <i-ep-home-filled />
            </el-icon>
            <span>首页导航</span>
        </template>

        <el-menu-item index="Home-0" @click="handleOpen('默认导航', 'Home-0', 0)">默认收藏
        </el-menu-item>
        <el-menu-item v-for="item in NavData" :index="'Home-' + item.id"
            @click="handleOpen('导航' + item.name, 'Home-' + item.id, item.id)">{{ item.name }}
        </el-menu-item>

        <add-nav-tag v-if="!Collapse"/>
    </el-sub-menu>
</template>

<script setup lang="ts">
import Bus from '../../Bus'
import { getNavTag, Floder } from '../../util/http'
import AddNavTag from './AddNavTag.vue'

const props = defineProps<{
    Collapse: boolean
}>()
const handleOpen = (title: string, key: string, id: number) => {
    Bus.emit('NavMenuClick', { title: title, key: key, id: id })
}

Bus.on('addNav', () => {
    getNavTag().then((res) => {
        NavData.value = res
    })
})
const NavData = ref<Floder[]>()
onMounted(() => {
    getNavTag().then((res) => {
        NavData.value = res
    })
})
</script>

<style scoped>
</style>