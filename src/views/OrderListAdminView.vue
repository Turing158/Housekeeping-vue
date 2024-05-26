<template>
    <div class="main">
        <h2>服务列表</h2>
        <div>
            <el-table
                :data="data"
                style="width: 100%">
                <el-table-column label="订单号" prop="id"/>
                <el-table-column label="创建用户">
                    <template #default="{row}">
                        <span>{{ row.createName }}</span><span>({{ row.createUser }})</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createDate"/>
                <el-table-column label="服务">
                    <template #default="{row}">
                        <span>{{ row.serviceName }}</span><span>({{ row.service }})</span>
                    </template>
                </el-table-column>
                <el-table-column label="预约服务人员">
                    <template #default="{row}">
                        <span>{{ row.servicerName }}</span><span>({{ row.servicer }})</span>
                    </template>
                </el-table-column>
                <el-table-column label="预约时间" prop="reservedDate"/>
                <el-table-column label="预约地址" prop="reservedPlace"/>
                <el-table-column label="留言" prop="note"/>
                <el-table-column label="支付费用" prop="value"/>
                <el-table-column label="订单状态" prop="status"/>
                <el-table-column label="用户评分" prop="userEvaluateStar"/>
                <el-table-column label="用户评价" prop="userEvaluate"/>
                <el-table-column width="85">
                    <template #default="{row}">
                        <el-button type="warning" plain @click="look(row.id)">查看</el-button>
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

import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const userStore = useUserStore()
const data = ref([]);
const page = ref(1)
const total = ref(0)
const onCurrentChange = (e)=>{
    page.value = e
    getDataToUser()
}
const region = ref(userStore.region)
const look = (id)=>{
    router.push(`/order/${id}`)
}
const getDataToUser = async()=>{
    
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