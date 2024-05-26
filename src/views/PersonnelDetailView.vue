<template>
    <div class="detailView">
        <PageHead class="top" :title="data.title" :subtitle="data.subtitle" :loading="loading"/>
        <div class="loading" v-show="loading">
            <el-skeleton animated class="avatar" :loading="loading">
                <template #template>
                    <el-skeleton-item variant="circle" style="--el-skeleton-circle-size: 100px"/>
                </template>
            </el-skeleton>
            <el-skeleton :rows="8" animated :loading="loading"/>
        </div>
        <el-scrollbar v-show="!loading">
            <div class="center">
                <div class="avatar">
                    <el-avatar size="large" :src="'/src/assets/avatar/'+data.avatar"/>
                    <div class="name">
                        <span>{{ data.name }}</span>
                        <br/>
                        <span>服务人员</span>
                    </div>
                    <div style="float: right;margin-top: -50px;margin-right: 20px;text-align: center;">
                        历史接单数<br/>
                        {{ data.history }}
                    </div>
                </div>
            </div>
            <div class="content">
                <div>经验证明</div>
                <div></div>
                <br/>
                <div>证书证明</div>
                <div></div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script setup>
import { findServicerByUser } from '@/api/company';
import PageHead from '@/components/PageHead.vue';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const loading = ref(true) 
const data = ref({
    title: '查询服务人员',
    subtitle: '公司',
    name: 'name',
    avatar: 'avatar',
    content: 'content'
})
const route = useRoute()
const getData = async()=>{
    loading.value = true
    await findServicerByUser(route.params.id).then(res=>{
        let outData = res.data.data
        console.log(outData);
        data.value = {
            title: '查询服务人员',
            subtitle: outData[0].company,
            name: outData[0].name,
            avatar: outData[0].avatar,
            experience: outData[0].experience,
            certificate: outData[0].certificate,
            experienceInfo: outData[0].experienceInfo,
            certificateInfo: outData[0].certificateInfo,
            history: outData[1]
        }
        loading.value = false
    }).catch(err=>{
        console.log(err);
        ElMessage.error('加载失败！')
    })
    
}
const init = ()=>{
    getData()
}
onMounted(init)
</script>
<style scoped>
.detailView{
    height: calc(100vh - 40px);
    overflow: hidden;
}
.top{
    margin-bottom: 20px;
}
.loading .avatar{
    margin-bottom: 20px;
}
.main {
    width: calc(100vw - 170px);
    height: calc(100vh - 40px);
    overflow-x: hidden;
    overflow-y: auto;
}

.center{
    margin-bottom: 20px;
}
.center .name{
    font-size: 16px;
    font-weight: bold;
    margin-left: 80px;
    margin-top: -50px;
}
.center .name span:nth-child(3){
    font-size: 14px;
    margin-top: 10px;
    font-weight: normal;
}

</style>