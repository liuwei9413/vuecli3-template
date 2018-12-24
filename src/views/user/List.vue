<template>
  <div class="list-wrap">
    <div class="search-wrap mb20 w400">
      <el-input placeholder="用户id、邮箱或昵称" v-model="searchModel" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="table-wrap" v-loading="loading">
      <el-table
        :data="tableData"
        style="width: 100%"
        >
        <el-table-column
          prop="id"
          label="用户id">
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="email"
          label="注册邮箱">
        </el-table-column>
        <el-table-column
          prop="date"
          label="注册时间">
        </el-table-column>
        <el-table-column
          prop="size"
          label="国家和地区">
        </el-table-column>
        <el-table-column
          prop="isDeveloper"
          label="是否是开发者"
          width="120"
          :formatter="isDeveloper">
        </el-table-column>
        <el-table-column
          prop="invitations"
          label="发帖总数">
        </el-table-column>
        <el-table-column
          prop="dapps"
          label="提交应用数">
        </el-table-column>
        <el-table-column
          prop="docs"
          label="提交文档数">
        </el-table-column>
        <el-table-column
          prop="templates"
          label="提交模板数">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="sealNumber(scope.row.id)"
              type="text">
              封号
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrap" v-if="total > 0">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAccountList } from '@/service.js'

export default {
  components: {
  },
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
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
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.loading = true
      getAccountList(params)
        .then(res => {
          console.log(res)
          this.loading = false
          this.tableData = res.data.list
          this.total = res.data.total
        })
        .catch(error => {
          this.loading = false
          console.log(error)
        })
    },
    isDeveloper (row) {
      return row.isDeveloper ? '是' : '否'
    },
    handleCurrentChange () {
      this.getList()
    },
    platformChange (checkList) {
      this.platformTypeCheckList = checkList
      this.getList()
    },
    sealNumber (id) {
      this.$router.push({ path: `/versions/edit?id=${id}` })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.list-wrap {
  .form-wrap {
    margin-bottom: 16px;
    .filter-wrap {
      float: left;
      .item {
        margin-bottom: 20px;
        .label {
          display: inline-block;
          margin-right: 30px;
          width: 100px;
          text-align: right;
        }
        .value {
          display: inline-block;
        }
      }
    }
    .add-btn {
      float: right;
    }
  }
  .table-wrap {
    margin-bottom: 30px;
  }
  .pagination-wrap {
    .el-pagination {
      text-align: center;
    }
  }
}
</style>
<style lang="scss">
.description {
  p {
    margin: 0;
  }
}
</style>