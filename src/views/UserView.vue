<template>
    <div class="main">
        <h2>用户列表</h2>
        <div>
            <el-table
                :data="data"
                style="width: 100%">
                <el-table-column label="用户名" prop="label"/>
                <el-table-column label="名称" prop="title"/>
                <el-table-column label="角色" prop="name"/>
                <el-table-column label="所属地区" prop="region"/>
                <el-table-column width="180">
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
        label: 'admin',
        title: '管理员',
        name: '管理员',
        region: 'XX地区'
    },
    {
        label: 'user',
        title: '用户',
        name: '用户',
        region: 'XX地区'
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