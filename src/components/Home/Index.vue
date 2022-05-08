<template>
    <div style="text-align: center;height: 100%;" >
        <search />
        <web-collect :id="props.id"/>
    </div>
</template>

<script setup lang="ts">
import WebCollect from './WebCollect.vue'
import Search from './Search.vue'

const props = defineProps<{
    id: number,
    name:string
}>()

console.log(props);

</script>

<style scoped>

</style>