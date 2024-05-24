<template>
    <div class="main">
        <h2>用户列表</h2>
        <div>
            <el-table
                :data="data"
                style="width: 100%">
                <el-table-column label="角色id" prop="role"/>
                <el-table-column label="角色名" prop="rolename"/>
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
import { findAllRole } from "@/api/user";
import { onMounted, ref } from "vue";

const data = ref([]);
const page = ref(1)
const total = ref(0)
const onCurrentChange = (e)=>{
    page.value = e
    getData()
}
const getData = async()=>{
    await findAllRole(page.value).then(res=>{
        let outData = res.data.data
        data.value = outData[0]
        total.value = outData[1]
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