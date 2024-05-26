import axios from 'axios'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'
import router from '@/router'

export const url = 'http://localhost:8080'

const request = axios.create({
    baseURL: url,
    timeout: 5000,
    withCredentials: true
})

request.interceptors.request.use((config)=>{
    const userStore = useUserStore()
    if(userStore.token){
        config.headers.Authorization = userStore.token
    }
    return config
})

request.interceptors.response.use((response)=>{
    let msg = response.data.msg
    if(msg == 'TOKEN_EXPIRED'){
        ElMessage.error('登录过期，请重新登录')
        router.push('/login')
    }
    return response
})

export default request