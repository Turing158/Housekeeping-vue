<template>
    <div class="main">
        <h2>应聘加入公司</h2>
        <div class="history">
            <el-table :data="data">
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
                    <template #default="{row}" >
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
                        <el-tag v-show="row.status == 'noPass'" type="danger">未通过</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="留言" prop="note"/>
                <el-table-column label="操作" width="180">
                    <template #default="{row}">
                        <el-button-group v-show="row.status == 'commit'">
                            <el-button type="primary" @click="showAccept(1,row.id)">通过</el-button>
                            <el-button type="warning" @click="showAccept(0,row.id)">不通过</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
            <div class="operate">
                <el-pagination @current-change="onCurrentChange" :total="total" background layout="prev, pager, next" />
            </div>
        </div>
        <el-dialog v-model="showEmployAccept" width="550" @close="onClose()">
            <div style="width: 500px; height: 160px;">
                <h2>处理应聘</h2>
                <p>正在{{ employAccept.isAccept == 'true'?'通过':'不通过' }}id：{{ employAccept.id }}</p>
                <br>
                <el-input type="textarea" v-model="employAccept.note" placeholder="请输入留言" />
                
                <el-button type="primary" style="margin-top: 15px;float: right;" @click="onConfirm()">确定</el-button>
                
            </div>
        </el-dialog>
    </div>
    
</template>
<script setup>
import { findAllEmployRecordByCompany, operateEmployRecord } from "@/api/company";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue"
const loading = ref(false)

const data = ref([])
const page = ref(1)
const total = ref(0)
const onCurrentChange = (e)=>{
    page.value = e
    getData()
}
const employAccept = ref({
    id: "",
    isAccept: "",
    note: ""
})
const showEmployAccept = ref(false)
const showAccept = (i,id)=>{
    employAccept.value.id = id
    employAccept.value.isAccept = i==1?'true':'false'
    showEmployAccept.value = true
}
const onClose = ()=>{
    employAccept.value = {
        id: "",
        isAccept: "",
        note: ""
    }
    showEmployAccept.value = false
}
const onConfirm = async()=>{
    if(employAccept.value.note.length == 0){
        ElMessage.error("请填写留言")
        return
    }
    else{
        await operateEmployRecord(employAccept.value).then(res=>{
            let msg = res.data.msg
            if(msg == "success"){
                ElMessage.success("操作成功")
                onClose()
                getData()
            }
            else{
                ElMessage.error(msg)
            }
        }).catch(err=>{
            ElMessage.error("操作失败")
        })
    }
    
}

const getData = async()=>{
    await findAllEmployRecordByCompany(page.value).then(res=>{
        data.value = res.data.data[0]
        total.value = res.data.data[1]
    }).catch(err=>{
        ElMessage.error("获取数据失败")
    })
}
const init = ()=>{
    getData()
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
.history{
    margin-top: 20px;
}
.operate{
    margin-top: 20px;
    display: flex;
    justify-content: end;
}
</style>