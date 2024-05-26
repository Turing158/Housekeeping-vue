<template>
    <div>
        <PageHead class="top" title="确认订单" :subtitle="data.title" :loading="loading">
            <template #extra>
                ￥{{data.value}}
                &emsp;
                <el-button :type="loading||btnLoading?'warning':'primary'" plain :loading="loading||btnLoading" @click="confirm()">确认订单</el-button>
            </template>
        </PageHead>
        <el-skeleton :rows="8" animated :loading="loading"/>
        <div class="content" v-show="!loading">
            <el-form inline :rules="rule" :model="order" ref="form">
                <el-form-item label="确认服务">
                    <el-input v-model="data.title" disabled/>
                </el-form-item>
                <el-form-item label="服务执行人">
                    <el-input v-model="data.name" disabled/>
                </el-form-item>
                <el-form-item label="预约时间" prop="date">
                    <el-date-picker type="datetime" v-model="order.date" value-format="YYYY/MM/DD hh:mm:ss" />
                </el-form-item>
                <el-form-item label="预约电话" prop="phone">
                    <el-input v-model="order.phone"/>
                </el-form-item>
                <el-form-item label="预约地址" prop="address">
                    <el-input v-model="order.address" style="width: 500px;"/>
                </el-form-item>
                <el-form-item label="&emsp;&emsp;&emsp;留言">
                    <el-input type="textarea" v-model="order.note" style="width: 500px;"/>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import PageHead from '@/components/PageHead.vue';
import { findServiceById } from "@/api/service";
import { useRoute } from "vue-router";
import { createOrder } from "@/api/order";
import router from "@/router";
import { ElMessage } from "element-plus";
const loading = ref(true) 
const data = ref({})
const form = ref(null)
const dateObj = new Date()
const fixZero = (num)=>{
    return num<10?'0'+num:num
}
const route = useRoute()
const order = ref({
    date: dateObj.getFullYear()+'/'+fixZero(dateObj.getMonth()+1)+'/'+fixZero(dateObj.getDate())+' '+fixZero(dateObj.getHours())+':'+fixZero(dateObj.getMinutes())+':'+fixZero(dateObj.getSeconds()),
    address: '',
    note: '',
    phone: ''
})
const rule = {
    address: [
        { required: true, message: '请输入预约地址', trigger: 'blur' }
    ],
    date: [
        { required: true, message: '请选择预约时间', trigger: 'change' }
    ],
    phone: [
        { required: true, message: '请输入预约电话', trigger: 'blur' }
    ]

}
const btnLoading = ref(false)
const confirm = async()=>{
    let obj = {
        service: route.params.id,
        reservedDate: order.value.date,
        reservedPlace: order.value.address,
        note: order.value.note,
        reservedPhone: order.value.phone
    }
    await form.value.validate().then(async()=>{
        btnLoading.value = true
        await createOrder(obj).then(res=>{
            let outData = res.data.data
            let msg = res.data.msg
            if(msg=='success'){
                ElMessage.success('下单成功！')
                router.replace('/order/'+outData)
            }
            else{
                ElMessage.error(msg)
            }
        }).catch(err=>{
            console.log(err);
            ElMessage.error('下单失败！')
        })
    }).catch(err=>{
        console.log(err);
    })
    btnLoading.value = false
}
const getData = async()=>{
    loading.value = true
    await findServiceById(route.params.id).then(res=>{
        let outData = res.data.data
        data.value = {
            title: outData.title,
            subtitle: outData.id,
            tag: outData.label.split(','),
            region: outData.region,
            user: outData.user,
            name: outData.name,
            avatar: outData.avatar,
            date: outData.date,
            value: outData.value,
            content: outData.content
        }
        loading.value = false
    }).catch(err=>{
        console.log(err);
        ElMessage.error('加载失败！')
    })
    
}
const init= ()=>{
    getData()
}

onMounted(init)
</script>
<style scoped>
.content{
    margin-top: 20px;
}
</style>