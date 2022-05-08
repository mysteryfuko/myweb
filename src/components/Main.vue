<template>

    <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-remove="removeTab"
        @tab-change="change">
        <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name"
            :closable="false">
            <component :is="item.component" :id="item?.id ? item.id : 0" :name="item.name"></component>
        </el-tab-pane>
    </el-tabs>
</template>
<script lang="ts" setup>
import { markRaw, ref } from 'vue'
import BlogList from '../components/Blog/List.vue'
import Home from '../components/Home/Index.vue'
import Read from '../components/Blog/Read.vue'
import Edit from '../components/Blog/Edit.vue'
import ClothesList from '../components/Clothes/List.vue'
import Bus from '../Bus'
import { TabPanelName } from 'element-plus/es';

type ClickEvent = {
    title: string,
    key: string
    id?: number
}

Bus.on('closeEdit', (e: any) => {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === e.key) {
        tabs.forEach((tab, index) => {
            if (tab.name === e.key) {
                const nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                    activeName = nextTab.name
                }
            }
        })
    }
    editableTabs.value = tabs.filter((tab) => tab.name !== e.key)
    editableTabsValue.value = activeName
})

Bus.on('menuClick', (e: ClickEvent) => {
    let isHave = false
    editableTabs.value.forEach((tab) => {
        if (tab.name === e.key) {
            isHave = true
        }
    })
    if (!isHave) {
        editableTabs.value.push({
            title: e.title,
            name: e.key,
            component: markRaw(BlogList),
            id: e.id
        })
    }
    editableTabsValue.value = e.key
})
Bus.on('ClothesClick', (e: ClickEvent) => {
    let isHave = false
    editableTabs.value.forEach((tab) => {
        if (tab.name === e.key) {
            isHave = true
        }
    })
    if (!isHave) {
        editableTabs.value.push({
            title: e.title,
            name: e.key,
            component: markRaw(ClothesList),
            id: e.id
        })
    }
    editableTabsValue.value = e.key
})

Bus.on('NavMenuClick', (e: ClickEvent) => {
    let isHave = false
    editableTabs.value.forEach((tab) => {
        if (tab.name === e.key) {
            isHave = true
        }
    })
    if (!isHave) {
        editableTabs.value.push({
            title: e.title,
            name: e.key,
            component: markRaw(Home),
            id: e.id
        })
    }
    editableTabsValue.value = e.key
})

Bus.on('BlogListClick', (e: ClickEvent) => {
    let isHave = false
    editableTabs.value.forEach((tab) => {
        if (tab.name === e.key) {
            isHave = true
        }
    })
    if (!isHave) {
        editableTabs.value.push({
            title: e.title,
            name: e.key,
            component: markRaw(Read),
            id: e.id
        })
    }
    editableTabsValue.value = e.key
})

Bus.on('NewBlog', (e: ClickEvent) => {
    let isHave = false
    editableTabs.value.forEach((tab) => {
        if (tab.name === e.key) {
            isHave = true
        }
    })
    if (!isHave) {
        editableTabs.value.push({
            title: e.title,
            name: e.key,
            component: markRaw(Edit),
            id: e.id
        })
    }
    editableTabsValue.value = e.key
})

const currentTab = ref(markRaw(Home))
const editableTabsValue = ref('Home-0')
type Tabs = {
    name: string,
    title: string,
    component: any,
    id?: number
}
const editableTabs = ref<Tabs[]>([
    {
        title: '默认导航',
        name: 'Home-0',
        component: markRaw(Home),
        id:0
    }
])
const change = (targetName: TabPanelName) => {
    editableTabs.value.forEach((tab) => {
        if (tab.name === targetName) {
            currentTab.value = tab.component
        }
    })
}

const removeTab = (targetName: TabPanelName) => {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (targetName != 'Home-0') {
        if (activeName === targetName ) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        activeName = nextTab.name
                    }
                }
            })
        }
        editableTabsValue.value = activeName
        editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
    }
}
</script>
<style>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
    height: 100%;
}


</style>