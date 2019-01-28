<template>
  <div class="manager-list">
    <el-breadcrumb class="breadcrumb mb30" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>后台用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="clearfix">
      <p class="title fl font18">后台用户列表</p>  
      <router-link to="/user/manager/add" v-if="adminLevel === 0">
        <el-button class="fr" type="primary" size="small">
          新增后台用户
        </el-button>
      </router-link>
    </div>
    <div class="table-wrap mb30" v-loading="loading">
      <el-table
        :data="tableData"
        style="width: 100%"
        >
        <el-table-column
          prop="realname"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="username"
          label="注册邮箱">
        </el-table-column>
        <el-table-column
          prop="disabled"
          label="状态"
          :formatter="accountStatus">
        </el-table-column>
        <el-table-column
          v-if="adminLevel === 0"
          label="操作">
          <template slot-scope="scope">
            <el-button v-show="scope.row.disabled === 'N'" @click.native.prevent="resetPassword(scope.row.uid, scope.row.adminLevel)" type="primary" size="small">重置密码</el-button>
            <el-button v-show="scope.row.uid !== activeUid" @click.native.prevent="changeStatus(scope.row.uid, scope.row.disabled)" type="primary" size="small">{{ scope.row.disabled === 'Y' ? '恢复' : '禁用' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrap" v-if="total > 0">
      <el-pagination class="text-center"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="size"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getStorage } from '@/util'
import { 
  getManagerList, 
  disabledManager, 
  resetManagerPass 
} from '@/service.js'

export default {
  components: {
  },
  data () {
    return {
      loading: false,
      disabledLoading: false,
      resetLoading: false,
      adminLevel: getStorage('userInfo').adminLevel,
      activeUid: getStorage('userInfo').uid,
      page: 1,
      size: 10,
      total: 0,
      tableData: []
    }
  },
  created () {
  },
  mounted  () {
    this.getList()
  },
  methods: {
    getList () {
      const params = {
        page: this.page,
        size: this.size
      }
      this.loading = true
      getManagerList(params)
        .then(res => {
          this.loading = false
          this.tableData = res.list
          this.total = res.count
        })
        .catch(() => {
          this.loading = false
        })
    },
    accountStatus (row) {
      return row.disabled === 'Y' ? '已禁用' : '正常'
    },
    handleCurrentChange () {
      this.getList()
    },
    resetPassword (uid) {
      let params = { uid: uid }
      this.resetLoading = true
      resetManagerPass(params)
        .then(() => {
          this.resetLoading = false
          this.$message({
            message: '密码重置成功，默认初始密码为：123456',
            type: 'success'
          });
        })
        .catch(() => {
          this.resetLoading = false
        })
    },
    changeStatus (uid, disabled) {
      let disabledDeal = disabled === 'Y' ? 'N' : 'Y'
      let params = {
        uid: uid,
        disabled: disabledDeal
      }
      this.disabledLoading = true
      disabledManager(params)
        .then(() => {
          this.disabledLoading = false
          this.$message({
            message: `${disabledDeal === 'Y' ? '已禁用' : '已启用'}`,
            type: 'success'
          });
          this.getList()
        })
        .catch(() => {
          this.disabledLoading = false
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>