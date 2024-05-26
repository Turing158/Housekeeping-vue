<template>
    <div class="main">
        <el-menu
            :default-active="index"
            style="width: 150px;background-color: #f9f9f9;"
            router
        >
            <el-menu-item class="title"><img src="/src/assets/img/logo.jpg"/>家政</el-menu-item>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/service">服务列表</el-menu-item>
            <el-menu-item index="/personnel">服务人员</el-menu-item>
            <el-menu-item index="/orderList">订单列表</el-menu-item>

            <el-sub-menu index="/admin">
                <template #title>管理</template>
                <el-menu-item index="/company">公司列表</el-menu-item>
                <el-menu-item index="/user">用户列表</el-menu-item>
                <el-menu-item index="/role">用户权限</el-menu-item>
                <el-menu-item index="/orderListAdmin">订单列表</el-menu-item>
            </el-sub-menu>

            <el-menu-item class="personal" v-show="userStroe.isLogin" @click="logout()">
                <template #title>
                    <div class="avatar">
                        <img :src="'/src/assets/avatar/'+userStroe.avatar" />
                    </div>
                    <div class="info">
                        <span>{{ userStroe.name }}</span>
                    </div>
                </template>
            </el-menu-item>
            <el-menu-item class="personal" index="/login" v-show="!userStroe.isLogin">登录</el-menu-item>
        </el-menu>
        
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const index = ref(route.path)
const userStroe = useUserStore()
const logout = () => {
    ElMessageBox.confirm('确定退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        userStroe.logout()
        ElNotification.success('退出成功')
    })
}
</script>
<style scoped>
.title{
    border-bottom: 1px solid #ebeef5;
    font-size: 18px;
    font-weight: bold;
}
.title:hover{
    background-color: #f9f9f9;

}
.title img{
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin-right: 10px;
}
.main{
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: #f1f1f1;
    overflow: hidden;
}
.content{
    width: calc(100vw - 180px);
    height: calc(100vh - 40px);
    margin: 20px;
    margin-right: 10px;
    overflow: hidden;
}
.personal{
    position: absolute;
    bottom: 1px;
    width: 100%;
    background-color: #f9f9f9;
    border-top: 1px solid #ebeef5;
}
.personal:hover{
    background-color: #eee;
}
.avatar{
    width: 40px;
    height: 40px;
}
.avatar img{
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
}
.info span{
    font-size: 15px;
    color: #606266;
}
</style>