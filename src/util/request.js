import axios from 'axios'
import { useUserStore } from '../stores/user'

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

export default request