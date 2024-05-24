<template>
    <div class="bg">
        <div class="center">
            <div class="top">糯米家政</div>
            <h1>Login</h1>
            <div class="content">
                <el-form :model="userObj" :rules="rules" hide-required-asterisk ref="formInput">
                    <el-form-item label="用户名" prop="user">
                        <el-input placeholder="请输入用户名" maxlength="16" v-model="userObj.user"></el-input>
                    </el-form-item>
                    <el-form-item label="密&emsp;码" prop="password">
                        <el-input placeholder="请输入密码" type="password" maxlength="25" v-model="userObj.password"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <el-input placeholder="请输入验证码" style="width: 120px;" maxlength="4" v-model="userObj.code"></el-input>
                        <Code margin="5 10px" ref="code"/>
                    </el-form-item>
                    <el-form-item>
                        <div class="operate">
                            <el-button type="warning" plain @click="confirmLogin()" :loading="loading">登录</el-button>
                            <el-button type="warning" plain @click="reg()">注册</el-button>
                            <el-button type="warning" plain @click="home()">主页</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Code from '../components/Code.vue'
import { ElMessage, ElNotification } from 'element-plus';
import { findUserByToken, login } from '@/api/user';
import { useUserStore } from '@/stores/user';
const router = useRouter()
const userObj = ref({
    user:'',
    password:'',
    code:''
})
const code = ref(null)
const loading = ref(false)
const rules = reactive({
    user:[
        {required: true, message: '请输入用户名', trigger: 'blur'}
    ],
    password:[
        {required: true, message: '请输入密码', trigger: 'blur'}
    ],
    code:[
        {required: true, message: '请输入验证码', trigger: 'blur'}
    ]
})
const formInput = ref(null)
const confirmLogin = async()=>{
    loading.value = true
    await formInput.value.validate(async(valida)=>{
        if(valida){
            await getToken()
            code.value.reflash()
        }
        else{
            ElNotification.error({
                title: '不能为空',
                message: '请检查输入是否正确'
            })
        }
    }) 
    loading.value = false
}
const reg = ()=>{
    router.push('/reg')
}
const home = ()=>{
    router.push('/')
}
const userStore = useUserStore()
const getToken = async()=>{
    await login(userObj.value).then(async(res)=>{
        let outData = res.data
        let msg = outData.msg
        if(msg == 'success'){
            userStore.setToken(outData.data)
            await getUserinfo()
        }
        else{
            ElNotification.error({
                title: '登录失败',
                message: msg
            })
        }
        
    }).catch(err=>{
        ElMessage.error("服务异常")
    })
}
const getUserinfo = async()=>{
    await findUserByToken().then(res=>{
        let outData = res.data
        let msg = outData.msg
        if(msg == 'success'){
            ElNotification.success({
                title: '登录成功',
                message: '欢迎回来'
            })
            router.push('/')
            userStore.setUser(outData.data.user)
            userStore.setName(outData.data.name)
            userStore.setRole(outData.data.role)
            userStore.setRegion(outData.data.region)
            userStore.setAvatar(outData.data.avatar)
            userStore.setIsLogin(true)
        }
        else{
            ElNotification.error({
                title: '获取用户信息失败',
                message: msg
            })
        }
    }).catch(err=>{
        ElMessage.error("服务异常")
    })
}
</script>
<style scoped>
.bg{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
}
.center{
    width: 300px;
    height: 280px;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 10px;
    overflow: hidden;
}
h1{
    position: relative;
    text-align: center;
    margin: 10px 0;
    top: -28px;
    z-index: 999;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.top{
    position: relative;
    width: 340px;
    height: 50px;
    background-color: #dfb21f;
    margin: -20px;
    margin-top: -10px;
    border-radius: 10px 10px 0 0;
    text-align: center;
    font-size: 12px;
    color: #4e3d05;
    font-weight: bold;
    line-height: 23px;
}
.content{
    position: relative;
    width: 300px;
    padding: 0 20px;
    left: -20px;
    padding-top: 50px;
    margin-top: -55px;
    background-color: #fff;
    border-radius: 15px ;  
}
.operate{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>