import request from "@/util/request";

export const url = ""

export const findAllService = (page,region)=>{
    let param = new URLSearchParams();
    param.append('page',page);
    param.append('region',region);
    return request.post("/findAllServiceOrderByRegion",param)
}

export const findServiceById = (id)=>{
    let param = new URLSearchParams();
    param.append('id',id);
    return request.post("/findServiceById",param)

}