<template>
    <div class="main">
        <h2>应聘加入公司</h2>
        <el-form class="form" :model="data" :rules="rules">
            <el-form-item label="姓名" prop="name">
                <el-input class="w-400" v-model="data.name"></el-input>
            </el-form-item>
            <el-form-item label="公司" prop="company">
                <el-select placeholder="请选择加入的公司" class="w-400" v-model="data.company">
                    <el-option v-for="i in option" :key="i.id" :value="i.id">
                        <template #default>
                            <span>{{i.name}}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{i.id}}</span>
                        </template>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="经验" prop="experience">
                <el-input class="w-400" v-model="data.experience"></el-input>
            </el-form-item>
            <el-form-item label="证书" prop="certificate">
                <el-input class="w-400" v-model="data.certificate"></el-input>
            </el-form-item>
            <el-form-item label="经验佐证">
                <el-button type="primary" @click="onUpload(1)">点击上传</el-button>
                <input class="hide" ref="exper" type="file" accept="image/jpeg, image/png, image/jpg" >
            </el-form-item>
            <el-form-item >
                <div class="imgShow">
                    <img :src="experData" v-show="experData != ''" height="500"/>
                </div>
            </el-form-item>
            <el-form-item label="上传证书">
                <el-button type="primary" @click="onUpload(2)">点击上传</el-button>
                <input class="hide" ref="cert" type="file" accept="image/jpeg, image/png, image/jpg">
            </el-form-item>
            <el-form-item>
                <div class="imgShow">
                    <img :src="certData" v-show="certData != ''" height="500"/>
                </div>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="submit()" :loading="loading">提交</el-button>
        <div class="history">
            <el-table :data="historyData">
                <el-table-column label="id" prop="id" width="280" />
                <el-table-column label="姓名" prop="truthName" />
                <el-table-column label="公司" prop="company">
                    <template #default="{row}">
                        <span>{{row.company}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="经验" prop="experience" />
                <el-table-column label="证书" prop="certificate" />
                <el-table-column label="经验佐证">
                    <template #default="{row}">
                        <img :src="'/src/assets/experience/'+row.experienceInfo" height="80"/>
                    </template>
                </el-table-column>
                <el-table-column label="证书佐证">
                    <template #default="{row}">
                        <img :src="'/src/assets/certificate/'+row.certificateInfo" height="80"/>
                    </template>
                </el-table-column>
                <el-table-column label="提交时间" prop="date" width="180"/>
                <el-table-column label="状态" prop="status" width="90">
                    <template #default="{row}">
                        <el-tag size="large" v-show="row.status == 'commit' || row.status == null" type="warning">未处理</el-tag>
                        <el-tag v-show="row.status == 'passed'" type="success">已通过</el-tag>
                        <el-tag v-show="row.status == 'notPass'" type="danger">未通过</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="留言" prop="note"/>
            </el-table>
            <div class="operate">
                <el-pagination @current-change="onCurrentChange" :total="total" background layout="prev, pager, next" />
            </div>
        </div>
    </div>
    
</template>
<script setup>
import { findAllEmployRecordByUser, findAllSelectCompany, submitEmployRecord } from "@/api/company";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue"
const loading = ref(false)
const data = ref({
    name: '',
    company: '',
    experience: '',
    certificate: ''
})
const rules = reactive({
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    company: [
        { required: true, message: '请选择公司', trigger: 'change' }
    ],
    experience: [
        { required: true, message: '请输入经验', trigger: 'blur' }
    ],
    certificate: [
        { required: true, message: '请输入证书', trigger: 'blur' }
    ]
})
const exper = ref(null)
const cert = ref(null)
const option = ref([])
const getSelectData = async()=>{
    await findAllSelectCompany().then(res=>{
        option.value = res.data.data
    })
}
const onUpload = (e)=>{
    if(e == 1){
        exper.value.click()
    }
    else{
        cert.value.click()
    }
}
const experData = ref('')
const certData = ref('')
const submit = async()=>{
    loading.value = true
    let obj = {
        truthName: data.value.name,
        company: data.value.company,
        experience: data.value.experience,
        certificate: data.value.certificate,
        experienceInfo: experData.value,
        certificateInfo: certData.value
    }
    await submitEmployRecord(obj).then(res=>{
        let msg = res.data.msg
        if(msg == 'success'){
            ElMessage.success("提交成功")
        }
        else{
            ElMessage.error("！提交失败！")
        }
    }).catch(err=>{
        ElMessage.error("服务异常")
    })
    loading.value = false
}
const historyData = ref([])
const page = ref(1)
const total = ref(0)
const onCurrentChange = (e)=>{
    page.value = e
    initHistory()
}
const initUpload1 = ()=>{
    exper.value.addEventListener('change', ()=> {
    let fileInputValue = exper.value
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
            experData.value = data
        };
        reader.readAsDataURL(file);
    });
}
const initUpload2 = ()=>{
    cert.value.addEventListener('change', ()=> {
    let fileInputValue = cert.value
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
            certData.value = data
        };
        reader.readAsDataURL(file);
    });
}
const initHistory = async()=>{
    await findAllEmployRecordByUser(page.value).then(res=>{
        let outData = res.data.data
        console.log(outData);
        if(outData.length > 0){
            historyData.value = outData[0]
            total.value = outData[1]
        }
        else{
            historyData.value = []
            total.value = 0
        }
    })
}
const init = ()=>{
    initUpload1()
    initUpload2()
    getSelectData()
    initHistory()
}
onMounted(init)
</script>
<style scoped>
.main{
    width: calc(100vw - 200px);
    display: block;
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100vh - 20px);
}
.form{
    margin-top: 20px;
}
.hide{
    display: none;
}
.imgShow{
    width: 80vw;
    overflow: auto;
}
.w-400{
    width: 400px;
}
.history{
    margin-top: 20px;
}
.operate{
    margin-top: 20px;
    display: flex;
    justify-content: end;
}
</style>