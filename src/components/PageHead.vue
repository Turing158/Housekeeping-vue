<template>
    <el-page-header @back="back">
        <template #content>
            
            <div>
                <div class="loading">
                    <el-progress
                        :percentage="100"
                        status="warning"
                        :indeterminate="true"
                        :duration="1"
                        v-show="loading"
                    />
                </div>
                <div v-show="!loading">
                    <span class="title"> {{ title }} </span>
                    <span class="subtitle">
                        {{ subtitle }}
                    </span>
                    <el-tag class="tag" effect="plain" :type="tagType" hit v-for="i in tag" :key="i">{{ i }}</el-tag>
                </div>
            </div>
        </template>
        <template #extra>
            <slot name="extra"></slot>
        </template>
    </el-page-header>
</template>
<script setup>
import { useRouter } from "vue-router"

const props = defineProps({
    title: {
        type: String,
        required: false
    },
    subtitle: {
        type: String,
        required: false
    },
    tag: {
        type: Array,
        required: false
    },
    tagType: {
        type: String,
        required: false,
        default: "primary"
    },
    loading: {
        type: Boolean,
        required: false,
        default: false
    }

})
const router = useRouter()
const back = ()=>{
    router.go(-1)
}
</script>
<style scoped>
.title{
    font-size: 20px;
    font-weight: bold;
    margin-right: 15px;
}
.subtitle{
    font-size: 15px;
    color: var(--el-text-color-regular);
    margin-right: 10px;
}
.tag{
    margin-right: 5px;
}
.loading{
    width: 40vw;
}
</style>