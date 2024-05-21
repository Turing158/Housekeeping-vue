<template>
    <div class="bg">
        <div class="center">
            <div class="top">糯米家政</div>
            <h1>Register</h1>
            <div class="content">
                <el-form :model="userObj" :rules="rules" hide-required-asterisk ref="formInput">
                    <el-form-item label="用户名" prop="user">
                        <el-input placeholder="请输入用户名" maxlength="16" v-model="userObj.user"></el-input>
                    </el-form-item>
                    <el-form-item label="密&emsp;码" prop="password">
                        <el-input placeholder="请输入密码" type="password" maxlength="25" v-model="userObj.password"></el-input>
                    </el-form-item>
                    <el-form-item label="地&emsp;区" prop="region">
                        <el-select v-model="userObj.region" placeholder="请选择地区">
                            <el-option v-for="i in option" :key="i" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <el-input placeholder="请输入验证码" style="width: 120px;" maxlength="4" v-model="userObj.code"></el-input>
                        <Code margin="5 10px" ref="code"/>
                    </el-form-item>
                    <el-form-item>
                        <div class="operate">
                            <el-button type="primary" plain @click="confirmReg()">注册</el-button>
                            <el-button type="primary" plain @click="login()" :loading="loading">登录</el-button>
                            <el-button type="primary" plain @click="home()">主页</el-button>
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
import { register } from '@/api/user';
const router = useRouter()
const userObj = ref({
    user:'',
    password:'',
    code:'',
    region:''
})
const code = ref(null)
const loading = ref(false)
const rules = reactive({
    user:[
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {pattern: /^[a-zA-Z0-9_]+$/, message: '只能输入字母、数字、下划线', trigger: 'blur'},
        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
        
    ],
    password:[
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 6, max: 25, message: '长度在 6 到 25 个字符', trigger: 'blur'}
    ],
    code:[
        {required: true, message: '请输入验证码', trigger: 'blur'}
    ],
    region:[
        {required: true, message: '请选择地区', trigger: 'blur'}
    ]
})
const formInput = ref(null)
const confirmReg = async()=>{
    loading.value = true
    formInput.value.validate(async(valida)=>{
        if(valida){
            await toReg()
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
const option = ref(['北京','上海','广州','深圳','杭州','成都','重庆','武汉','西安','郑州','南京','合肥','济南','青岛','天津','沈阳','大连','长春','哈尔滨','南昌','福州','厦门','南宁','海口','石家庄','太原','呼和浩特','银川','兰州','西宁','乌鲁木齐','拉萨','贵阳','昆明','成都','长沙','台北','香港','澳门'])
const login = ()=>{
    router.push('/login')
}
const home = ()=>{
    router.push('/')
}
const toReg = async()=>{
    console.log(userObj.value);
    await register(userObj.value).then(res=>{
        let outData = res.data
        let msg = outData.msg
        if(msg == 'success'){
            ElNotification.success({
                title: '注册成功',
                message: '欢迎加入'
            })
            router.push('/login')
        }
        else{
            ElNotification.error({
                title: '注册失败',
                message: msg
            })
        }
    }).catch(err=>{
        ElMessage.error('服务异常')
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
    height: 320px;
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
    background-color: #1f99df;
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