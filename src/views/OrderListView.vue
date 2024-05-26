<template>
    <div class="main">
        <h2>服务列表</h2>
        <div>
            <el-table
                :data="data"
                style="width: 100%"
            
                >
                <el-table-column label="订单号" prop="id" width="280"/>
                <el-table-column label="创建用户" min-width="150">
                    <template #default="{row}">
                        <span>{{ row.createName }}</span><span>({{ row.createUser }})</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createDate" width="180"/>
                <el-table-column label="服务" width="300">
                    <template #default="{row}">
                        <span>{{ row.serviceName }}</span><span>({{ row.service }})</span>
                    </template>
                </el-table-column>
                <el-table-column label="预约服务人员" width="200">
                    <template #default="{row}">
                        <span>{{ row.reservedName }}</span><span>({{ row.reservedUser }})</span>
                    </template>
                </el-table-column>
                <el-table-column label="预约时间" prop="reservedDate" width="180"/>
                <el-table-column label="预约地址" prop="reservedPlace" width="180"/>
                <el-table-column label="留言" prop="note"  width="180"/>
                <el-table-column label="支付费用" prop="value" fixed="right">
                    <template #default="{row}">
                        <span>￥{{ row.value }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="订单状态" fixed="right">
                    <template #default="{row}">
                        <el-tag :type="row.status == 'complete'?'success':row.status == 'end'?'info':'primary'">{{ statusToCN(row.status) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column width="85" fixed="right">
                    <template #default="{row}">
                        <el-button type="warning" plain @click="look(row.id)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column width="120" fixed="right">
                    <template #default="{row}">
                        <el-button 
                        v-show="row.reservedUser == userStore.user"
                        :type="row.status == 'paid'?'success':row.status == 'start'?'danger':row.status == 'end'?'primary':'info'" 
                        plain 
                        @click="operate(row.id,row.status,row.userEvaluateStar,row.userEvaluate)"
                        :disabled="disabled"
                        >
                        {{ row.status == 'paid'?'接受服务':row.status == 'start'?'完成服务':row.status == 'end'?'查看评价':'等待评价' }}
                        </el-button>
                        <el-button v-show="row.createUser == userStore.user" type="primary" @click="evaluate()">评价</el-button>
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
        <el-dialog title="评价" :model-value="evaluateDiv" width="500" @close="onCloseEvaluate()">
            <div style="width: 500px;display: flex; flex-direction: column;align-items: center;">
                <el-rate v-model="evaluateData.star" :colors="colors" size="large" clearable />
                <el-form>
                    <el-form-item label="评价">
                        <el-input style="width: 300px;" type="textarea" v-model="evaluateData.evaluate" placeholder="请输入评价内容"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="confirmEvaluate()">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="评价" :model-value="showEvaluateDiv" width="500" @close="onCloseShowEvaluate()">
            <div style="width: 500px;display: flex; flex-direction: column;align-items: center;">
                <el-rate v-model="showEvaluateData.star" :colors="colors" size="large" clearable disabled/>
                <el-form>
                    <el-form-item label="评价">
                        <el-input style="width: 300px;" type="textarea" v-model="showEvaluateData.evaluate" readonly></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script setup>

import { acceptOrder, completeOrder, evaluateOrder, findAllOrderToServicer, findAllOrderToUser } from "@/api/order";
import { useUserStore } from "@/stores/user";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const disabled = ref(false)
const evaluateDiv = ref(false)
const userStore = useUserStore()
const data = ref([]);
const page = ref(1)
const total = ref(0)
const onCurrentChange = (e)=>{
    page.value = e
    getData()
}
const region = ref(userStore.region)
const look = (id)=>{
    router.push(`/order/${id}`)
}
const getDataToUser = async()=>{
    await findAllOrderToUser(page.value).then(res=>{
        let msg = res.data.msg
        if(msg == 'success'){
            data.value = res.data.data[0]
            total.value = res.data.data[1]
        }else{
            ElMessage.error(res.message)
        }
    })
}
const getDataToServicer = async()=>{
    await findAllOrderToServicer(page.value).then(res=>{
        let msg = res.data.msg
        if(msg == 'success'){
            console.log(res.data.data);
            data.value = res.data.data[0]
            total.value = res.data.data[1]
        }else{
            ElMessage.error(res.message)
        }
    })
}
const statusToCN = (status)=>{
    if(status == 'paid'){
        return '已支付'
    }
    else if(status == 'start'){
        return '开始服务'
    }
    else if(status == 'complete'){
        return '完成服务'
    }
    else if(status == 'end'){
        return '结束订单'
    }
    else{
        return '等待'
    }
}
const accept = async(id)=>{
    await acceptOrder(id).then(res=>{
        let msg = res.data.msg
        if(msg == 'success'){
            ElMessage.success('接受成功')
            getData()
        }else{
            ElMessage.error(res.message)
        }
    }).catch(err=>{
        console.log(err);
    })
}
const complete = async(id)=>{
    await completeOrder(id).then(res=>{
        let msg = res.data.msg
        if(msg == 'success'){
            ElMessage.success('完成成功')
            getData()
        }else{
            ElMessage.error(res.message)
        }
    }).catch(err=>{
        console.log(err);
    })
}
const operate = (id,status,star,evaluate)=>{
    disabled.value = true
    if(status == 'paid'){
        accept(id)
    }
    else if(status == 'start'){
        complete(id)
    }
    else if(status == 'end'){
        console.log(star);
        showEvaluate(id,star,evaluate)
    }
    else{
        ElMessage.error('等待评价')
    }
    disabled.value = false

}
const showEvaluateDiv = ref(false)
const showEvaluateData = ref({
    id: '',
    star: 0,
    evaluate: ''
})
const showEvaluate = (id,star,evaluate)=>{

    showEvaluateData.value = {
        id: id,
        star: star,
        evaluate: evaluate
    }
    showEvaluateDiv.value = true
}
const onCloseShowEvaluate = ()=>{
    showEvaluateData.value = {
        id: '',
        star: 0,
        evaluate: ''
    }
    showEvaluateDiv.value = false
}
const evaluateData = ref({
    id: '',
    star: 0,
    evaluate: ''

})
const onCloseEvaluate = ()=>{
    evaluateData.value = {
        id: '',
        star: 0,
        evaluate: ''
    }
    evaluateDiv.value = false
}
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
const evaluate = (id)=>{
    evaluateData.value.id = id
    evaluateDiv.value = true
}
const confirmEvaluate = async()=>{
    console.log(evaluateData.value);
    if(evaluateData.value.star == 0){
        ElMessageBox.alert('真的服务有那么差劲嘛', '提示', {
            confirmButtonText: '很差劲',
            cancelButtonText: '点错了',
            showCancelButton: true,
            type: 'warning'
        }).then(() => {
            ElMessage.success('评价成功')
            evaluating()
            onCloseEvaluate()
        })
    }
    else{
        evaluating()
    }
}
const evaluating = async()=>{
    await evaluateOrder(evaluateData.value.id,evaluateData.value.star,evaluateData.value.evaluate).then(res=>{
        let msg = res.data.msg
        if(msg == 'success'){
            ElMessage.success('评价成功')
            onCloseEvaluate()
        }else{
            ElMessage.error(res.message)
        }
    }).catch(err=>{
        console.log(err);
    })
}
const getData = ()=>{
    if(userStore.role == 'servicer'){
        getDataToServicer()
    }else{
        getDataToUser()
    }

}
const init = ()=>{
    getData()
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