<template>
  <div class="list-wrap">
    <el-breadcrumb class="breadcrumb mb30" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search-wrap mb20 w400">
      <el-input placeholder="用户id、邮箱或昵称" v-model="searchModel">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-input>
    </div>
    <div class="table-wrap mb30" v-loading="loading">
      <el-table
        :data="tableData"
        style="width: 100%"
        >
        <el-table-column
          prop="username"
          label="用户id">
        </el-table-column>
        <el-table-column
          prop="developerName"
          label="开发者名称">
        </el-table-column>
        <el-table-column
          prop="email"
          label="注册邮箱">
        </el-table-column>
        <el-table-column
          label="国家和地区"
          :formatter="countryAndCity">
        </el-table-column>
        <el-table-column
          prop="postCount"
          label="发帖总数">
        </el-table-column>
        <el-table-column
          prop="appCount"
          label="提交应用数">
        </el-table-column>
        <el-table-column
          label="状态"
          :formatter="accountStatus">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="handleDeletePopup(scope.row.uid, scope.row.disabled)" type="primary" size="small">{{ scope.row.disabled === 'Y' ? '启封' : '封号' }}</el-button>
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
import {
  getUserAccountList,
  deleteUserAccount
} from '@/service.js'

export default {
  components: {
  },
  data () {
    return {
      tableData: [],
      page: 1,
      size: 10,
      total: 0,
      searchModel: '',
      loading: false
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
        size: this.size,
        search: this.searchModel
      }
      this.loading = true
      getUserAccountList(params)
        .then(res => {
          this.loading = 
          this.searchModel = ''
          this.tableData = res.list
          this.total = res.count
        })
        .catch(() => {
          this.searchModel = ''
          this.loading = false
        })
    },
    handleSearch () {
      this.page = 1
      this.size = 10
      this.getList()
    },
    accountStatus (row) {
      return row.disabled === 'Y' ? '已封号' : '正常'
    },
    countryAndCity (row) {
      if (!row.state) {
        return ''
      } else {
        if (!row.province) {
          return `${row.state.split('-')[1]}`
        } else {
          return `${row.state.split('-')[1]} / ${row.province.split('-')[1]}`
        }
      }
    },
    handleCurrentChange () {
      this.getList()
    },
    handleDeletePopup (id, disabled) {
      this.deleteId = id
      this.disabled = disabled === 'Y' ? 'N' : 'Y'
      if (disabled === 'N') {
        this.$confirm('封号操作将导致该用户无法使用innovationLab，但不会注销该用户，是否继续操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDelete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      } else {
        this.handleRecover()
      }   
    },
    handleDelete () {
      const params = {
        id: this.deleteId,
        disabled: this.disabled
      }
      deleteUserAccount(params)
        .then(() => {
          this.$message({
            type: 'success',
            message: '封号成功!'
          });
          this.getList()
        })
        .catch(() => {
        })
    },
    handleRecover () {
      const params = {
        id: this.deleteId,
        disabled: this.disabled
      }
      deleteUserAccount(params)
        .then(() => {
          this.$message({
            type: 'success',
            message: '已恢复!'
          });
          this.getList()
        })
        .catch(() => {
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
<style lang="scss">
.description {
  p {
    margin: 0;
  }
}
</style>