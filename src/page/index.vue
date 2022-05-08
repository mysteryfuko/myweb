<template>
    <el-container>
        <Side />
        <el-container>
            <el-header height="30px">
                <Login/>
            </el-header>
            <el-main>
                <Main />
            </el-main>
        </el-container>

    </el-container>
</template>

<script setup lang="ts">
import Side from '../components/Side.vue'
import Main from '../components/Main.vue';
import Login from '../components/Login.vue';
</script>

<style scoped>
.el-main {
    padding: 0;
}

.el-container {
    height: 100%;
}
</style>