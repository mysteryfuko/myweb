<script setup lang="ts">
import { onMounted, ref } from 'vue';

import BlogSide from '../components/Blog/BlogSide.vue'
import HomeSide from '../components/Home/Side.vue'
import ClothesSide from '../components/Clothes/Side.vue'

const Collapse = ref(true)

</script>

<template>
    <div class="aside">
        <el-aside class="layout-aside">
            <el-menu background-color="#545c64" active-text-color="#409EFF" default-active="Home-0" :collapse="Collapse">
                <el-menu-item disabled>
                    <div @click="Collapse = !Collapse">
                        <el-icon :size="14">
                            <i-ep-Expand />
                        </el-icon>
                    </div>
                </el-menu-item>

                <home-side :Collapse="Collapse"/>
                <blog-side :Collapse="Collapse" />
                <clothes-side/>
                
            </el-menu>
        </el-aside>
    </div>
</template>

<style scoped lang="scss">
// pc端左侧导航样式

.aside {
    height: 100%;
}

.layout-aside {
    height: 100%;
}

.el-aside {
    width: 100%;
}

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

.el-menu:not(.el-menu--collapse) {
    width: 200px;
}
</style>
