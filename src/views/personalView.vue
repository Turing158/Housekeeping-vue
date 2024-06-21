<template>
    <!-- 设置界面 -->
    <div>
        <h2>个人中心</h2>
        <div class="main">
            <el-card class="item" style="width: 400px;">
                <template #header >
                    <span>个人信息</span>
                </template>
                <el-form ref="infoForm" label-width="80px" :model="info" :rules="rules1">
                    <el-form-item label="头像">
                        <div>
                            <input type="file" ref="avatarUpload" style="display: none;">
                            <img class="avatar" :src="'/src/assets/avatar/'+info.avatar">
                        </div>
                        <el-button type="primary" size="small" :loading="loading"  @click="chooseImg()">上传头像</el-button>
                    </el-form-item>
                    <el-form-item label="昵称" prop="name">
                        <el-input v-model="info.name"></el-input>
                    </el-form-item>
                    <el-form-item label="地区" prop="region">
                        <el-select v-model="info.region"></el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="loading">修改信息</el-button>
                    </el-form-item>
                </el-form>
                
            </el-card>
            <el-card class="item" style="width: 400px;">
                <template #header >
                    <span>修改密码</span>
                </template>
                <el-form ref="passwordForm" label-width="80px" :model="password" :rules="rules2">
                    <el-form-item label="旧密码" prop="old">
                        <el-input type="password" v-model="password.old"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="new">
                        <el-input type="password" v-model="password.new"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirm">
                        <el-input type="password" v-model="password.confirm"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="loading">修改密码</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        
        </div>
    </div>
</template>
<script setup>
import { uploadAvatar } from "@/api/user";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
const userStore = useUserStore();
const loading = ref(false);
const infoForm = ref(null);
const passwordForm = ref(null);
const info = ref({
    avatar: '',
    name: '',
    region: ''
})
const password = ref({
    old: '',
    new: '',
    confirm: ''
})
const rules1 = {
    name: [
        { required: true, message: '请输入昵称', trigger: 'blur' }
    ],
    region: [
        { required: true, message: '请选择地区', trigger: 'change' }
    ]
}
const rules2 = {
    old: [
        { required: true, message: '请输入旧密码', trigger: 'blur' }
    ],
    new: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
        { max: 20, message: '密码长度不能大于20位', trigger: 'blur' },
        { validator: (rule, value, callback) => {
            if (value === password.value.old) {
                callback(new Error('新密码不能和旧密码相同'));
            } else {
                callback();
            }
        }, trigger: 'blur' }
    ],
    confirm: [
        { required: true, message: '请再次输入新密码', trigger: 'blur' },
        { validator: (rule, value, callback) => {
            if (value !== password.value.new) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        }, trigger: 'blur' }
    ]
}
const initInfo = ()=>{
    info.value = {
        avatar: userStore.avatar,
        name: userStore.name,
        region: userStore.region
    }
}

const avatarUpload = ref(null)
const chooseImg = ()=>{
    avatarUpload.value.click()
}
const iniUpload = ()=>{
    avatarUpload.value.addEventListener('change', ()=> {
    let fileInputValue = avatarUpload.value
        if (!fileInputValue.value) {
            fileInputValue.value = "";
            return;
        }
        let file = fileInputValue.files[0];
        let size = file.size;
        if (size >= 5 * 1024 * 1024) {
          fileInputValue.value = "";
          ElMessage.error('文件大小超出限制(5MB)');
          return false;
        }
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
          fileInputValue.value = "";
          ElMessage.error('不是有效的图片文件!');
          return;
        }
        let reader = new FileReader();
        reader.onload = (e)=> {
            let data = e.target.result;
            uploadAvatarFunc(data)
        };
        reader.readAsDataURL(file);
    });
}

const uploadAvatarFunc = async(data)=>{
    await uploadAvatar(data).then(res=>{
        let msg = res.data.msg
        if(msg == "success"){
            userStore.setAvatar(res.data.data)
            ElMessage.success("上传成功")
            initInfo()
        }
        else{
            ElMessage.error(msg)
        }
    }).catch(err=>{
        ElMessage.error("上传失败")
    })
}

const init = ()=>{
    initInfo();
    iniUpload();
}
onMounted(init)
</script>
<style scoped>
.main {
    display: flex;
    flex-wrap: wrap;
}
.item {
    margin: 10px;
}
.avatar{
    width: 50px; 
    height: 50px; 
    border-radius: 50%; 
    margin: 0 50px;
}
</style>