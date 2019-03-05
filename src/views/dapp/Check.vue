<template>
  <div>
    <el-breadcrumb class="breadcrumb mb30" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>上架审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="first">
        <div class="table-wrap mb30" v-loading="loadingForFirst">
          <el-table
            :data="tableDataForFirst"
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
              prop="developerName"
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
              prop="updateTime"
              label="提交时间"
              :formatter="updateTimeFormatForFirst">
            </el-table-column>
            <el-table-column
              prop="updateInfo"
              label="更新内容"
              width="300"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="体验链接">
              <template slot-scope="scope">
                <a :href="scope.row.tryAddress" target="_blank">{{scope.row.tryAddress}}</a>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small">
                  <router-link :to="`/dapp/check/detail?id=${scope.row.id}&appid=${scope.row.appID}`">去审核</router-link>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-wrap" v-if="totalForFirst > 0">
          <el-pagination class="text-center"
            @current-change="handleCurrentChangeForFirst"
            :current-page.sync="pageForFirst"
            :page-size="sizeForFirst"
            layout="total, prev, pager, next, jumper"
            :total="totalForFirst">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史记录" name="second">
        <div class="table-wrap mb30" v-loading="loadingForSecond">
          <el-table
            class="second-table"
            :data="tableDataForSecond"
            style="width: 100%"
            @row-click="handleRowClick"
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
              prop="developerName"
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
              prop="submitTime"
              label="提交时间"
              :formatter="updateTimeFormatForSecond">
            </el-table-column>
            <el-table-column
              prop="auditTime"
              label="审核时间"
              :formatter="auditTimeFormatForSecond">
            </el-table-column>
            <el-table-column
              prop="admin"
              label="审核人">
            </el-table-column>
            <el-table-column
              label="审核结果">
              <template slot-scope="scope">
                <span>{{!!scope.row.status ? '成功' : '失败'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="reasonCN"
              label="失败原因">
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-wrap" v-if="totalForSecond > 0">
          <el-pagination class="text-center"
            @current-change="handleCurrentChangeForSecond"
            :current-page.sync="pageForSecond"
            :page-size="sizeForSecond"
            layout="total, prev, pager, next, jumper"
            :total="totalForSecond">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { dateFormat } from '@/util'
import { 
  getAuditDappList,
  getAuditDappListHistory,
} from '@/service.js'

export default {
  components: {
  },
  data () {
    return {
      activeName: 'first',
      loadingForFirst: false,
      pageForFirst: 1,
      sizeForFirst: 10,
      tableDataForFirst: [],
      totalForFirst: 0,
      loadingForSecond: false,
      pageForSecond: 1,
      sizeForSecond: 10,
      tableDataForSecond: [],
      totalForSecond: 0,
    }
  },
  created () {
  },
  mounted  () {
    this.getListForFirst()
  },
  methods: {
    getListForFirst () {
      const params = {
        page: this.pageForFirst,
        size: this.sizeForFirst
      }
      this.loadingForFirst = true
      getAuditDappList(params)
        .then(res => {
          this.loadingForFirst = false
          this.tableDataForFirst = res.list
          this.totalForFirst = res.count
        })
        .catch(() => {
          this.loadingForFirst = false
        })
    },
    handleCurrentChangeForFirst () {
      this.getListForFirst()
    },
    updateTimeFormatForFirst (row) {
      return dateFormat(row.updateTime / 1000, 'yyyy-MM-dd hh:mm')
    },
    getListForSecond () {
      const params = {
        page: this.pageForSecond,
        size: this.sizeForSecond
      }
      this.loadingForSecond = true
      getAuditDappListHistory(params)
        .then(res => {
          this.loadingForSecond = false
          this.tableDataForSecond = res.list
          this.totalForSecond = res.count
        })
        .catch(() => {
          this.loadingForSecond = false
        })
    },
    handleCurrentChangeForSecond () {
      this.getListForSecond()
    },
    updateTimeFormatForSecond (row) {
      return dateFormat(row.submitTime / 1000, 'yyyy-MM-dd hh:mm')
    },
    auditTimeFormatForSecond (row) {
      return dateFormat(row.auditTime / 1000, 'yyyy-MM-dd hh:mm')
    },
    handleRowClick(row) {
      this.$router.push(`/dapp/check/history?id=${row.appID}`)
    },
    handleClick(tab) {
      this.activeName = tab.name
      if (tab.name === 'first') {
        this.pageForFirst = 1
        this.getListForFirst()
      } else if (tab.name === 'second') {
        this.pageForSecond = 1
        this.getListForSecond()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.second-table {
  .el-table__row {
    cursor: pointer;
  }
}
</style>