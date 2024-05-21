<template>
    <div class="main">
        <h2>服务列表</h2>
        <div>
            <el-table
                :data="data"
                style="width: 100%">
                <el-table-column label="标签" prop="label"/>
                <el-table-column label="服务" prop="title"/>
                <el-table-column label="发起人" prop="name"/>
                <el-table-column label="发起时间" width="180" prop="date"/>
                <el-table-column label="所属地区" prop="region"/>
                <el-table-column width="85">
                    <template #default="{row}">
                        <el-button type="warning" plain>查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column width="180">
                    <template #default="{row}">
                        <el-button type="primary" plain>编辑</el-button>
                        <el-button type="danger" plain>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="onCurrentChange"
                >
            </el-pagination>
        </div>
    </div>
</template>
<script setup>
import { findAllService } from "@/api/service";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const userStore = useUserStore()
const data = ref([]);
const page = ref(1)
const total = ref(0)
const onCurrentChange = (e)=>{
    page.value = e
    getDataToUser()
}
const region = ref(userStore.region)
const getDataToUser = async()=>{
    await findAllService(page.value,region.value).then(res=>{
        let outdata = res.data.data
        data.value = outdata[0]
        total.value = outdata[1]
    }).catch(err=>{
        ElMessage.error('获取数据失败')
    })
}
const init = ()=>{
    getDataToUser()
}
onMounted(init)
</script>
<style scoped>
.main{
    width: 100%;
    height: 100%;
    display: block;
    overflow: auto;
}
h2{
    margin: 10px 0;
}
.page{
    margin-top: 20px;
    display: flex;
    justify-content: end;
}
</style>