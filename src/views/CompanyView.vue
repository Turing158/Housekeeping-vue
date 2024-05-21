<template>
    <div class="main">
        <h2>服务列表</h2>
        <div>
            <el-table
                :data="data"
                style="width: 100%">
                <el-table-column label="公司id" prop="id"/>
                <el-table-column label="公司名称" prop="name"/>
                <el-table-column label="所属用户" prop="user"/>
                <el-table-column label="创建时间" prop="date"/>
                <el-table-column width="200">
                    <template #default="{row}">
                        <el-button type="primary" plain>编辑</el-button>
                        <el-button type="danger" plain>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";

const data = ref([
    {
        id: 1,
        name: 'XX公司',
        user: '张三',
        date: '2021-09-01'
    }
]);
</script>
<style scoped>
.main{
    width: 100%;
    height: 100%;
    display: block;
}
h2{
    margin: 10px 0;
}
.page{
    margin-top: 20px;
    display: flex;
    justify-content: end;
}
</style>