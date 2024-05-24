import request from "../util/request";


export const login = (data)=>{
    let param = new URLSearchParams();
    param.append("user",data.user)
    param.append("password",data.password)
    param.append("code",data.code)
    return request.post("/login",param)
}

export const findUserByToken = ()=>request.post("/findUserByToken")

export const register = (data)=>{
    let param = new URLSearchParams();
    param.append("user",data.user)
    param.append("password",data.password)
    param.append("code",data.code)
    param.append("region",data.region)
    return request.post("/register",param)
}
const admin = "/admin"
export const findAllUser = (page)=>{
    let param = new URLSearchParams();
    param.append('page',page);
    return request.post(admin+"/findAllUser",param)
}

export const findAllRole = (page)=>{
    let param = new URLSearchParams();
    param.append('page',page);
    return request.post(admin+"/findAllRole",param)
}