<template>
    <div class="main">
        <h2>服务列表</h2>
        <div>
            <el-table
                :data="data"
                style="width: 100%">
                <el-table-column label="公司id" prop="id"/>
                <el-table-column label="公司名称" prop="name"/>
                <el-table-column label="所属用户" prop="user">
                    <template #default="{row}">
                        {{row.name}}({{ row.user }})
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="date"/>
                <el-table-column width="200">
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
import { findAllCompany } from "@/api/company";
import { onMounted, ref } from "vue";

const data = ref([]);
const page = ref(1)
const total = ref(0)
const onCurrentChange = (e)=>{
    page.value = e
    getData()
}
const getData = async()=>{
    await findAllCompany(page.value).then(res=>{
        let outdata = res.data.data
        data.value = outdata[0]
        total.value = outdata[1]
    }).catch(err=>{
        ElMessage.error('获取数据失败')
    })
}
const init = () =>{
    getData()
}
onMounted(init)
</script>
<style scoped>
.main{
    width: 100%;
    height: 100%;
    display: block;
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