<template>
    <div class="webcollect" @click="visible = false">
        <el-row :gutter="30" justify="center" v-for="(item, ind) in getCow()">
            <el-tooltip class="box-item" effect="dark" v-for="(items) in getCol(item)" :content="items.name" placement="bottom">
                <el-col :xs="6" :span="1" :key="items.id">
                    <a :href="items.url" target="_blank" @click.left="webUrlClick(items.id as number)"
                        @click.middle="webUrlClick(items.id as number)">
                        <el-card class="box-card-file">
                            <div class="box-card-file-icon">
                                <img v-if='items.icon' :src="items.icon">
                                <div v-if='!items.icon'>{{ items.name.split('')[0].toUpperCase() }}</div>
                            </div>
                        </el-card>
                    </a>
                    <div class="box-card-file-name">{{ items.name }}</div>
                </el-col>
            </el-tooltip>
            <el-col :xs="6" :span="1" v-if="(ind + 1) == getCow() && permissions.admin" @click.stop="popoverClick">
                <el-popover :placement="popoverWhere" title="添加网站收藏" :width="300" v-model:visible="visible">
                    <template #reference>
                        <el-card class="box-card-file">
                            <div class="box-card-file-icon">
                                <el-icon :size="34">
                                    <i-ep-plus />
                                </el-icon>
                            </div>
                        </el-card>
                    </template>
                    <el-input v-model="addUrl.name" placeholder="网站名称" />
                    <el-input v-model="addUrl.url" placeholder="网站地址" />
                    <div class="add-box-conf">
                        <el-button @click="handleAdd">添加</el-button>
                        <el-button @click="visible = false">取消</el-button>
                    </div>
                </el-popover>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { getWebPage, Props, postData } from '../../util/http'
import { User } from '../../store'

const permissions = User()
const visible = ref<boolean>(false)
const props = defineProps<{
    id: number,
}>()
const addUrl = ref<Props>({
    click: 0,
    icon: '',
    name: '',
    url: '',
    belong: props.id,
})

const popoverClick = () => {
    visible.value = true
}
const handleAdd = () => {
    getIcon().then((res) =>
        addUrl.value.icon = res
    ).then(() => {
        let postdata = {
            action: 'add',
            data: addUrl.value,
            where: 'webcollect'
        }
        postData(postdata).then((status) => {
            getWebPage(props.id).then(res => {
                data.value = res
            })
            if (status) {
                alert('添加成功')
                visible.value = false
            }
            else alert('添加失败')
        })
    })
}
const webUrlClick = (id: number) => {
    postData({
        action: 'click',
        where: 'webcollect',
        data: {
            id: id
        }
    })
}
const getIcon = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!addUrl.value.isFolder) {
            if (addUrl.value.url.indexOf("http://") && addUrl.value.url.indexOf("https://")) {
                addUrl.value.url = "http://" + addUrl.value.url
            }
        }
        const img = new Image()
        img.src = addUrl.value.url.split('/')[0] + '//' + addUrl.value.url.split('/')[2] + '/favicon.ico'
        img.onload = () => {
            resolve(img.src)
        }
        img.onerror = () => {
            resolve('')
        }
    })

}
const data = ref<Props[]>([])
const popoverWhere = ref<any>('right')
onMounted(() => {
    if (document.body.clientWidth < 1000) popoverWhere.value = 'bottom'

    getWebPage(props.id).then(res => {
        data.value = res
    })
})



const getCow = (): number => {
    return Math.ceil((data.value.length + 1) / 8)
}

const getCol = (index: number): Props[] => {
    return data.value.slice((index - 1) * 8, index * 8)
}

</script>

<style scoped lang="scss">
.webcollect {
    padding-top: 30px;
    height: 100%;
}

.box-card-file-name {
    font-size: 15px;
    justify-content: center;
    width: 70px;
    font-weight: 400;
    overflow: hidden;
    height: 20px;
    white-space: nowrap;
}

a {
    text-decoration: none
}

.el-card {
    width: 65px;
    height: 65px;
    border-radius: 10px;
    --el-card-padding: 0px;
}

.box-card-file-icon {
    width: 65px;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 32px;
        height: 32px;

    }

    div {
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
        background: #ccc;
        font-size: 32px;
    }

    .el-icon {
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
        font-size: 32px;
    }
}
</style>