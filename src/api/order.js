import request from "@/util/request";

export const createOrder = (data)=>request.post("/createOrder",data)

export const findOrderById = (id)=>request.post("/findOrderById",null,{params:{id}})

export const findAllOrderToUser = (page)=>request.post("/findAllOrderToUser",null,{params:{page}})

export const findAllOrderToServicer = (page)=>request.post("/findAllOrderToServicer",null,{params:{page}})

export const acceptOrder = (id)=>request.post("/acceptOrder",null,{params:{id}})

export const completeOrder = (id)=>request.post("/completeOrder",null,{params:{id}})

export const evaluateOrder = (id,star,evaluate)=>request.post("/evaluateOrder",null,{params:{id,star,evaluate}})

