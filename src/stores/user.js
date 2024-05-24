import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('housekeeping-user', () => {
    const user = ref('')
    const name = ref('')
    const role = ref('')
    const region = ref('')
    const avatar = ref('')
    const token = ref('')
    const isLogin = ref(false)
    
    const setUser = (User)=>{
      user.value = User
    }

    const setName = (Name)=>{
        name.value = Name
    }

    const setRole = (Role)=>{
        role.value = Role
    }

    const setRegion = (Region)=>{
        region.value = Region
    }

    const setToken = (Token)=>{
        token.value = Token
    }

    const setIsLogin = (IsLogin)=>{
        isLogin.value = IsLogin
    }
    const setAvatar = (Avatar)=>{
        avatar.value = Avatar
    }

    const logout = ()=>{
        user.value = ''
        name.value = ''
        role.value = ''
        region.value = ''
        token.value = ''
        isLogin.value = false
    }
    return { user, name,region, role, token, isLogin,avatar, setUser, setName, setRole, setToken, setIsLogin,setRegion,setAvatar,logout }
},{
    persist:true
})