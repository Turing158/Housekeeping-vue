<template>
    <div>
        <PageHead title="订单详细" :subtitle="'订单号:'+data.id" :tag="[data.status,]" tag-type="warning"/>
        <div class="main" v-if="!isNull">
            <el-card>
                <el-row>
                    <el-col :span="12">
                        <el-form label-width="80px">
                            <el-form-item label="订单号">
                                <span>{{ data.id }}</span>
                            </el-form-item>
                            <el-form-item label="订单状态">
                                <span>{{ data.status }}</span>
                            </el-form-item>
                            <el-form-item label="创建时间">
                                <span>{{ data.createDate }}</span>
                            </el-form-item>
                            <el-form-item label="创建用户">
                                <span>{{ data.createName }}({{ data.createUser }})</span>
                            </el-form-item>
                            <el-form-item label="支付金额">
                                <span>￥{{ data.value }}</span>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <el-form label-width="80px">
                            <el-form-item label="服务项目">
                                <span>{{ data.serviceName }}({{ data.service }})</span>
                            </el-form-item>
                            <el-form-item label="预约时间">
                                <span>{{ data.reservedDate }}</span>
                            </el-form-item>
                            <el-form-item label="预约电话">
                                <span>{{ data.reservedPhone }}</span>
                            </el-form-item>
                            <el-form-item label="服务人员">
                                <span>{{ data.reservedName }}({{ data.reservedUser }})</span>
                            </el-form-item>
                            <el-form-item label="预约地址">
                                <span>{{ data.reservedPlace }}</span>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row>
                    <el-form label-position="top">
                        <el-form-item label="留言">
                            <span>{{ data.note }}</span>
                        </el-form-item>
                    </el-form>
                </el-row>
            </el-card>
        </div>
    </div>
</template>
<script setup>
import { findOrderById } from "@/api/order";
import PageHead from "@/components/PageHead.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute()
const loading = ref(true)
const data = ref({})
const isNull = ref(false)
const getData = async()=>{
    loading.value = true
    await findOrderById(route.params.id).then(res=>{
        let msg = res.data.msg
        if(msg == "success"){
            data.value = res.data.data
        }else{
            isNull.value = true
        }
    }).catch(err=>{
        console.log(err)
    })
    loading.value = false
}
const init = ()=>{
    getData()
}
onMounted(init)
</script>
<style scoped>
.main{
    margin-top: 20px;
}
</style>