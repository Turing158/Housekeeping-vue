<template>
    <div class="detailView">
        <PageHead class="top" :title="data.title" :subtitle="data.subtitle" :tag="data.tag" :loading="loading">
            <template #extra>
                <el-button :type="loading?'warning':'primary'" plain :loading="loading" @click="select(route.params.id)">选择服务</el-button>
            </template>
        </PageHead>
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
                </div>
                <div class="date">
                    {{ data.date }}
                </div>
            </div>
            <div class="content">
                {{ data.content }}
            </div>
        </el-scrollbar>
    </div>
</template>
<script setup>
import { findServiceById } from '@/api/service';
import PageHead from '@/components/PageHead.vue';
import { ElMessage } from 'element-plus';
import { onMounted, provide, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
const loading = ref(true) 
const data = ref({})
const route = useRoute()
const router = useRouter()
const select = (id)=>{
    router.push('/confirmOrder/'+id)
}
const getData = async()=>{
    loading.value = true
    await findServiceById(route.params.id).then(res=>{
        let outData = res.data.data
        data.value = {
            title: outData.title,
            subtitle: outData.id+' ['+outData.region+']',
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
.date{
    margin-top: -20px;
    float: right;
    font-size: 14px;
    color: var(--el-text-color-regular);
}

</style>