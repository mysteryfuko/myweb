<template>
    <el-menu-item index="clothes-1" @click="handleClick">
        <el-icon :size="14">
            <i-ep-magic-stick />
        </el-icon>
        <span>衣服</span>
    </el-menu-item>
</template>

<script setup lang="ts">
import Bus  from '../../Bus';
const handleClick = () => {
    Bus.emit('ClothesClick', { title: '衣服', key: 'clothes-1', id: 1 })
}

</script>

<style scoped>
</style>