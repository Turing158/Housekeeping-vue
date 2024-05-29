import request from "@/util/request";

export const findAllServicerOrderByRegion = (page,region)=>{
    let param = new URLSearchParams();
    param.append('page',page);
    param.append('region',region);
    return request.post("/findAllServicerOrderByRegion",param)
}

export const findServicerByUser = (user)=>{
    let param = new URLSearchParams();
    param.append('user',user);
    return request.post("/findServicerByUser",param)
}
export const findAllSelectCompany = ()=>request.post("/findAllSelectCompany")

export const submitEmployRecord = (data)=>request.post("/submitEmployRecord",data)

const admin = "/admin"

export const findAllCompany = (page)=>{
    let param = new URLSearchParams();
    param.append('page',page);
    return request.post(admin+"/findAllCompany",param)
}