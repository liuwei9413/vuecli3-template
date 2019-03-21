<template>
  <div class="dapp-type">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Blockchain Application类型管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="clearfix">
      <router-link to="/dapp/type/add">
        <el-button class="fr" type="primary" size="small">
          新增类型
        </el-button>
      </router-link>
    </div>
    <el-table
      v-loading="loading || loadingForSort"
      :data="tableData"
      row-key="id"
      style="width: 100%"
      >
      <el-table-column
        prop="name_cn"
        label="类型名称（中）">
      </el-table-column>
      <el-table-column
        prop="name_en"
        label="类型名称（英）">
      </el-table-column>
      <el-table-column
        label="应用图标">
        <template slot-scope="scope">
          <img class="app-icon" :src="scope.row.pic">
        </template>
      </el-table-column>
      <el-table-column
        prop="realname"
        label="添加人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间"
        :formatter="createTimeFormat">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click.native.prevent="handleDeletePopup(scope.row.id)" type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
import _ from 'lodash'
import { setStorage, dateFormat } from '@/util'
import { 
  getDappTypeList,
  sortDappTypeList,
  deleleDappType
} from '@/service'

export default {
  data() {
    return {
      tableData: [],
      deleteId: '',
      loading: false,
      loadingForSort: false,
    }
  },
  mounted() {
    this.getList()
    this.rowDrop()
  },
  methods: {
    getList () {
      this.loading = true
      getDappTypeList()
        .then(res => {
          this.loading = false
          this.tableData = res.list
        })
        .catch(() => {
          this.loading = false
        })
    },
    createTimeFormat (row) {
      return dateFormat(row.createTime / 1000, 'yyyy-MM-dd')
    },
    sortList (params) {
      this.loadingForSort = true
      sortDappTypeList(params)
        .then(() => {
          this.loadingForSort = false
          this.getList()
        })
        .catch(() => {
          this.loadingForSort = false
        })
    },
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          let newIds = []
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
          _.forEach(_this.tableData, (item) => {
            newIds.push(item.id)
          })
          _this.sortList({indexArray: newIds})
        }
      })
    },
    handleEdit (row) {
      setStorage('dappType', row)
      this.$router.push('/dapp/type/edit')
    },
    handleDeletePopup (id) {
      this.deleteId = id
      this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDelete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleDelete () {
      const params = {
        id: this.deleteId
      }
      deleleDappType(params)
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        })
        .catch(() => {
        })
    }
  }
}
</script>
<style scoped>
.app-icon {
  display: block;
  width: 30px;
  height: 30px;
}
</style>