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

export const findAllEmployRecordByUser = (page)=>request.post("/findAllEmployRecordByUser",null,{params:{page:page}})

export const findAllEmployRecordByCompany = (page)=>request.post("/findAllEmployRecordByCompany",null,{params:{page:page}})

export const operateEmployRecord = (obj)=>request.post(
    "/operateEmployRecord",
    null,
    {
        params:{
            id:obj.id,
            note:obj.note,
            isAccept:obj.isAccept
        }
    }
)

export const findServicerAchievement = (user)=>request.post("/findServicerAchievement",null,{params:{user:user}})

const admin = "/admin"

export const findAllCompany = (page)=>{
    let param = new URLSearchParams();
    param.append('page',page);
    return request.post(admin+"/findAllCompany",param)
}