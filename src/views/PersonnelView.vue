<template>
    <div class="main">
        <h2>服务人员</h2>
        <div>
            <el-table
                :data="data"
                style="width: 100%">
                <el-table-column label="服务人员" prop="name"/>
                <el-table-column label="证书" prop="certificate"/>
                <el-table-column label="相关经验" prop="experience"/>
                <el-table-column label="所属公司" prop="company"/>
                <el-table-column label="所属地区" prop="region"/>
                <el-table-column label="" prop="is"/>
                <el-table-column width="85">
                    <template #default="{row}">
                        <el-button type="warning" plain>查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column width="240">
                    <template #default="{row}">
                        <el-button type="success" plain>业绩</el-button>
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
import { onMounted, ref } from "vue";

const data = ref([
    {
        name: '张三',
        certificate: '高级技师',
        experience: '5年',
        company: 'XX公司',
        region: 'XX地区',
        is: '在职'
    },
    {
        name: '李四',
        certificate: '高级技师',
        experience: '5年',
        company: 'XX公司',
        region: 'XX地区',
        is: '在职'
    },
    {
        name: '王五',
        certificate: '高级技师',
        experience: '5年',
        company: 'XX公司',
        region: 'XX地区',
        is: '在职'
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