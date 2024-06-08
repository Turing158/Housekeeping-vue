<template>
  <div class="main">
    <h2>服务人员</h2>
    <div>
      <el-table :data="data" style="width: 100%">
        <el-table-column label="服务人员" prop="name">
          <template #default="{ row }">
            <span>{{ row.name }}</span
            ><span>({{ row.user }})</span>
          </template>
        </el-table-column>
        <el-table-column label="证书" prop="certificate" />
        <el-table-column label="相关经验" prop="experience" />
        <el-table-column label="所属公司" prop="company" />
        <el-table-column label="所属地区" prop="region" />
        <el-table-column label="" prop="is" />
        <el-table-column width="85">
          <template #default="{ row }">
            <el-button type="warning" plain @click="look(row.user)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          :width="250"
          v-if="userStore.role == 'admin'"
        >
          <template #default="{ row }">
            <div>
              <el-button type="primary" plain>编辑</el-button>
              <el-button type="danger" plain>删除</el-button>
              <el-button type="success" plain @click="showAchievement(row.user, row.name)"
                >业绩</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="onCurrentChange"
      >
      </el-pagination>
    </div>
    <el-dialog v-model="isShowAchievement">
      <div>
        <h2>业绩</h2>
        <p>服务人员: {{ achievement.name }}({{ achievement.user }})</p>
        <br />
        <el-form>
          <el-form-item label="接单数">
            <el-input v-model="achievement.count" readonly></el-input>
          </el-form-item>
          <el-form-item label="交易总金额">
            <el-input v-model="achievement.sum" readonly></el-input>
          </el-form-item>
          <el-form-item label="收入">
            <el-input v-model="achievement.income" readonly></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { findAllServicerOrderByRegion, findServicerAchievement } from '@/api/company'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const region = ref(userStore.region)
const data = ref([])
const page = ref(1)
const total = ref(0)
const onCurrentChange = (e) => {
  page.value = e
  getDataToUser()
}
const router = useRouter()
const look = (user) => {
  router.push('/personnel/' + user)
}
const achievement = ref({
  user: '',
  name: '',
  count: 0,
  sum: 0,
  income: 0
})
const isShowAchievement = ref(false)
const showAchievement = (user, name) => {
  getServicerAchievement(user)
  achievement.value.user = user
  achievement.value.name = name
  isShowAchievement.value = true
}
const getServicerAchievement = async (user) => {
  await findServicerAchievement(user)
    .then((res) => {
      if (res.data.msg === 'success') {
        achievement.value.count = res.data.data[0]
        achievement.value.sum = res.data.data[1]
        achievement.value.income = res.data.data[2]
      } else {
        ElMessage.error('不存在数据')
        isShowAchievement.value = true
      }
    })
    .catch((err) => {
      ElMessage.error('获取数据失败')
      isShowAchievement.value = true
    })
}
const getDataToUser = async () => {
  await findAllServicerOrderByRegion(page.value, region.value)
    .then((res) => {
      let outdata = res.data.data
      if (outdata != null) {
        data.value = outdata[0]
        total.value = outdata[1]
      } else {
        ElMessage.warning('无数据')
      }
    })
    .catch((err) => {
      ElMessage.error('获取数据失败')
    })
}
const init = () => {
  getDataToUser()
}
onMounted(() => {
  init()
})
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: block;
}
h2 {
  margin: 10px 0;
}
.page {
  margin-top: 20px;
  display: flex;
  justify-content: end;
}
</style>
