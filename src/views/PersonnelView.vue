<template>
    <div class="main">
        <h2>服务人员</h2>
        <div>
            <el-table
                :data="data"
                style="width: 100%">
                <el-table-column label="服务人员" prop="name">
                    <template #default="{row}">
                        <span>{{ row.name }}</span><span>({{ row.user }})</span>
                    </template>
                </el-table-column>
                <el-table-column label="证书" prop="certificate"/>
                <el-table-column label="相关经验" prop="experience"/>
                <el-table-column label="所属公司" prop="company"/>
                <el-table-column label="所属地区" prop="region"/>
                <el-table-column label="" prop="is"/>
                <el-table-column width="85">
                    <template #default="{row}">
                        <el-button type="warning" plain @click="look(row.user)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column width="240">
                    <template #default="{row}">
                        <el-button type="success" plain>业绩</el-button>
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
import { findAllServicerOrderByRegion } from "@/api/company";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore()
const region = ref(userStore.region)
const data = ref([]);
const page = ref(1)
const total = ref(0)
const onCurrentChange = (e)=>{
    page.value = e
    getDataToUser()
}
const router = useRouter()
const look = (user)=>{
    router.push('/personnel/'+user)
}
const getDataToUser = async()=>{
    await findAllServicerOrderByRegion(page.value,region.value).then(res=>{
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
onMounted(()=>{
    init()
})
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