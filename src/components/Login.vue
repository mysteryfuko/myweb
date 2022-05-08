<template>
    <div @click="handleLogin" v-if="!permissions.admin">登录</div>
    <el-dialog v-model="LoginFormVisible" title="登录" width="400px">
        <el-form :model="postData">
            <el-form-item label="用户名" label-width="80px">
                <el-input v-model="postData.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" label-width="80px">
                <el-input v-model="postData.password" autocomplete="off" type="password" show-password />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="LoginFormVisible = false">取消</el-button>
                <el-button type="primary" @click="handlepost">登录</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { Login } from '../util/http'
import { User } from '../store'

const permissions = User()
const LoginFormVisible = ref<boolean>(false)
const postData = reactive({
    username: '',
    password: ''
})
const handleLogin = () => {
    LoginFormVisible.value = true
}

const handlepost = () => {
    Login(postData).then((res) => {
        if (res == 'success') {
            LoginFormVisible.value = false
            permissions.$patch({
                admin: true,
                user: postData.username
            })
        } else {
            alert('登录失败')
        }

    })
}
</script>

<style scoped>
</style>