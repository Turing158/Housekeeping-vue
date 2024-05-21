<template>
    <div :style="{width:props.width+'px',height:props.height+'px',margin: props.margin}">
        <img :src="src" alt="" :width="props.width" :height="props.height" @click="reflash()"/>
    </div>
</template>
<script setup>
import { ref } from "vue"

const src = ref('http://localhost:8080/getImageCode')
const props = defineProps({
    width: {
        type: Number,
        default: 100
    },
    height:{
        type: Number,
        default: 40
    },
    margin:{
        type: String,
        default: '0 0'
    }
})
const reflash = ()=>{
    src.value = 'http://localhost:8080/getImageCode?'+Math.random()
}
defineExpose({
    reflash
})
</script>
<style scoped>
img{
    cursor: pointer;
}
</style>