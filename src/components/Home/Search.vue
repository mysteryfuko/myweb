<template>
    <div>
        <el-autocomplete v-model="value" :fetch-suggestions="querySearch" :trigger-on-focus="false"
            placeholder="Please input" class="input-with-select" @keydown.enter="onSearch" :autofocus="true">
            <template #append>
                <el-button :icon="Search" @click="onSearch" />
            </template>
            <template #prepend>
                <el-select v-model="search" placeholder="百度" style="width: 80px;">
                    <el-option label="百度" value="https://www.baidu.com/s?wd=" />
                    <el-option label="github" value="2" />
                </el-select>
                <div></div>
            </template>
        </el-autocomplete>
    </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { getSearchKey } from '../../util/http';
const value = ref<string>('');
const search = ref<string>('https://www.baidu.com/s?wd=')
const onSearch = () => {
    window.open(search.value + value.value, "_blank");
}




const querySearch = (queryString: string, cb: any): void => {
    if (queryString && search.value == 'https://www.baidu.com/s?wd=') {
        getSearchKey(queryString).then(res => cb(res))
    }
    else {
        cb([])
    }
}
</script>

<style scoped>
</style>