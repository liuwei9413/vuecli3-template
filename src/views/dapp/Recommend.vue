<template>
  <div class="dapp-type">
    <el-breadcrumb class="breadcrumb mb30" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>应用推荐配置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search-wrap mb20 w400">
      <el-input placeholder="输入应用名称或开发者" v-model.trim="searchModel" @keyup.native.enter="handleSearch">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-input>
    </div>
    <div class="table-wrap mb30" v-loading="loadingForSearch || loadingForRecommendDapp">
      <el-table
        :data="tableDataForSearch"
        style="width: 100%"
        >
        <el-table-column
          prop="name"
          label="产品名称">
        </el-table-column>
        <el-table-column
          prop="classifies"
          label="类别">
        </el-table-column>
        <el-table-column
          prop="account"
          label="开发者">
        </el-table-column>
        <el-table-column
          prop="type"
          label="开发状态">
        </el-table-column>
        <el-table-column
          prop="version"
          label="版本">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="提交时间"
          width="200"
          :formatter="createTimeFormat">
        </el-table-column>
        <el-table-column
          prop="vevidStatus"
          label="是否KYC"
          :formatter="isKYC">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="handleRecommendDapp(scope.row.appID, 1)" :disabled="scope.row.disabled !== 'N'" type="primary" size="small">{{ scope.row.disabled === 'N' ? '添加至推荐列表' : '已添加至推荐列表' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="recommend-title">
      <p>推荐应用列表</p>
    </div>
    <el-table
      class="table-recommend"
      v-loading="loading || loadingForRecommendDapp2 || loadingForSort"
      :data="tableData"
      row-key="id"
      style="width: 100%"
      >
      <el-table-column
        prop="name"
        label="产品名称">
      </el-table-column>
      <el-table-column
        prop="classifies"
        label="类别">
      </el-table-column>
      <el-table-column
        prop="account"
        label="开发者">
      </el-table-column>
      <el-table-column
        prop="type"
        label="开发状态">
      </el-table-column>
      <el-table-column
        prop="version"
        label="版本">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="提交时间"
        width="200"
        :formatter="createTimeFormat">
      </el-table-column>
      <el-table-column
        prop="vevidStatus"
        label="是否KYC"
        :formatter="isKYC">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        :formatter="statusFormat">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="handleRecommendDappPopup(scope.row.appID, 0)" type="primary" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
import _ from 'lodash'
import { dateFormat } from '@/util'
import {
  searchDappUnrecommendList,
  getRecommendDappList,
  recommendDapp,
  sortRecommendDappList,
} from '@/service'

export default {
  data() {
    return {
      loadingForSearch: false,
      searchModel: '',
      tableDataForSearch: [],
      tableData: [],
      deleteId: '',
      loading: false,
      loadingForSort: false,
      loadingForRecommendDapp: false,
      loadingForRecommendDapp2: false,
    }
  },
  mounted() {
    this.getList()
    this.rowDrop()
  },
  methods: {
    handleSearch () {
      if (this.searchModel == '') return
      this.loadingForSearch = true
      let params = {
        search: this.searchModel
      }
      searchDappUnrecommendList(params)
        .then((res) => {
          this.loadingForSearch = false
          this.tableDataForSearch = res.list
        })
        .catch(() => {
          this.loadingForSearch = false
        })
    },
    getList () {
      this.loading = true
      getRecommendDappList()
        .then(res => {
          this.loading = false
          this.tableData = res.list
        })
        .catch(() => {
          this.loading = false
        })
    },
    isKYC (row) {
      return row.vevidStatus === 'UNPASS' ? '否' : '是'
    },
    createTimeFormat (row) {
      return dateFormat(row.createTime / 1000, 'yyyy-MM-dd hh:mm')
    },
    statusFormat (row) {
      if (row.disabled === 'Y') {
        return '禁用'
      } else {
        return row.status === 0 ? '上架中' : '已下架'
      }
    },
    handleRecommendDappPopup (appId, recommend) {
      this.$confirm('是否确认将该应用从推荐列表中移除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleRecommendDapp(appId, recommend)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    handleRecommendDapp (appId, recommend) {
      let loadingStr = recommend === 1 ? 'loadingForRecommendDapp' : 'loadingForRecommendDapp2'
      this[loadingStr] = true
      let params = {
        appID: appId,
        recommend: recommend
      }
      recommendDapp(params)
        .then(() => {
          this[loadingStr] = false
          this.handleSearch()
          this.getList()
        })
        .catch(() => {
          this[loadingStr] = false
        })
    },
    sortList (params) {
      this.loadingForSort = true
      sortRecommendDappList(params)
        .then(() => {
          this.loadingForSort = false
          this.getList()
        })
        .catch(() => {
          this.loadingForSort = false
        })
    },
    rowDrop() {
      const tbody = document.querySelector('.table-recommend .el-table__body-wrapper tbody')
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
  }
}
</script>
<style scoped>
.app-icon {
  display: block;
  width: 30px;
  height: 30px;
}
.recommend-title {
  margin-top: 100px;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  background: #f2f2f2;
}
</style>