<template>
  <div class="dapp-list" v-loading.fullscreen="loading">
    <el-breadcrumb class="breadcrumb mb30" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>产品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="form-wrap mb30">
      <el-form label-width="100px">
        <el-form-item label="状态：">
          <el-checkbox :indeterminate="isIndeterminateForStatus" v-model="checkAllModelForStatus" @change="handleCheckAllForStatus">全选</el-checkbox>
          <el-checkbox-group v-model="checkedForStatus" @change="handleCheckedForStatus">
            <el-checkbox v-for="(item, index) in initStatusOptions" :label="item.label" :key="index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="产品类型：">
          <el-checkbox :indeterminate="isIndeterminateForClassify" v-model="checkAllModelForClassify" @change="handleCheckAllForClassify">全选</el-checkbox>
          <el-checkbox-group v-model="checkedForClassify" @change="handleCheckedForClassify">
            <el-checkbox v-for="(item, index) in initClassifyOptions" :label="item.label" :key="index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="KYC：">
          <el-checkbox :indeterminate="isIndeterminateForKyc" v-model="checkAllModelForKyc" @change="handleCheckAllForKyc">全选</el-checkbox>
          <el-checkbox-group v-model="checkedForKyc" @change="handleCheckedForKyc">
            <el-checkbox v-for="(item, index) in initKycOptions" :label="item.label" :key="index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否推荐：">
          <el-checkbox :indeterminate="isIndeterminateForRecommend" v-model="checkAllModelForRecommend" @change="handleCheckAllForRecommend">全选</el-checkbox>
          <el-checkbox-group v-model="checkedForRecommend" @change="handleCheckedForRecommend">
            <el-checkbox v-for="(item, index) in initRecommendOptions" :label="item.label" :key="index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="适配类型：">
          <el-checkbox :indeterminate="isIndeterminateForDevice" v-model="checkAllModelForDevice" @change="handleCheckAllForDevice">全选</el-checkbox>
          <el-checkbox-group v-model="checkedForDevice" @change="handleCheckedForDevice">
            <el-checkbox v-for="(item, index) in initDeviceOptions" :label="item.label" :key="index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrap mb30">
      <el-table
        :data="tableData"
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
          label="上架时间"
          width="200"
          :formatter="createTimeFormat">
        </el-table-column>
        <el-table-column
          label="是否KYC"
          :formatter="isKYC">
        </el-table-column>
        <el-table-column
          label="是否推荐"
          :formatter="recommendFormat">
        </el-table-column>
        <el-table-column
          label="状态"
          :formatter="statusFormat">
        </el-table-column>
        <el-table-column
          label="支持设备"
          :formatter="deviceFormat">
        </el-table-column>
        <el-table-column
          label="支持协议"
          :formatter="protocolFormat">
        </el-table-column>
        <el-table-column
          width="200"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small"><router-link class="link" :to="`/dapp/detail?appid=${scope.row.appID}`">查看</router-link></el-button>
            <el-button @click.native.prevent="changeStatusPopup(scope.row.appID, scope.row.disabled)" type="primary" size="small">{{ scope.row.disabled === 'Y' ? '解禁' : '禁用' }}</el-button>
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
import { createNewArrByOneKey } from '@/util'
import { dateFormat } from '@/util'
import { 
  getDappList,
  getDappTypeList,
  disabledDapp,
} from '@/service.js'

const statusOptions = [
  {
    label: 1,
    name: '已上架'
  },
  {
    label: 2,
    name: '已下架'
  },
  {
    label: 3,
    name: '禁用'
  }
]
const kycOptions = [
  {
    label: 1,
    name: '已认证'
  },
  {
    label: 2,
    name: '未认证'
  }
]
const recommendOptions = [
  {
    label: 1,
    name: '是'
  },
  {
    label: 2,
    name: '否'
  }
]
const deviceOptions = [
  {
    label: 1,
    name: '网站'
  },
  {
    label: 2,
    name: '手机'
  }
]

export default {
  components: {
  },
  data () {
    return {
      loading: false,
      disabledLoading: false,
      resetLoading: false,
      dappClassifyList: [],
      classifyIDsModel: [],
      initStatusOptions: statusOptions,
      initStatusModel: createNewArrByOneKey(statusOptions, 'label'),
      isIndeterminateForStatus: false,
      checkAllModelForStatus: true,
      checkedForStatus: createNewArrByOneKey(statusOptions, 'label'),
      initClassifyOptions: [],
      initClassifyModel: [],
      isIndeterminateForClassify: false,
      checkAllModelForClassify: true,
      checkedForClassify: [],
      initKycOptions: kycOptions,
      initKycModel: createNewArrByOneKey(kycOptions, 'label'),
      isIndeterminateForKyc: false,
      checkAllModelForKyc: true,
      checkedForKyc: createNewArrByOneKey(kycOptions, 'label'),
      initRecommendOptions: recommendOptions,
      initRecommendModel: createNewArrByOneKey(recommendOptions, 'label'),
      isIndeterminateForRecommend: false,
      checkAllModelForRecommend: true,
      checkedForRecommend: createNewArrByOneKey(recommendOptions, 'label'),
      initDeviceOptions: deviceOptions,
      initDeviceModel: createNewArrByOneKey(deviceOptions, 'label'),
      isIndeterminateForDevice: false,
      checkAllModelForDevice: true,
      checkedForDevice: createNewArrByOneKey(deviceOptions, 'label'),
      page: 1,
      size: 10,
      total: 0,
      tableData: [],
    }
  },
  created () {
  },
  mounted  () {
    (async () => {
      try {
        let dappClassifyListResult = await getDappTypeList()
        this.dappClassifyList = dappClassifyListResult.list
        this.dappClassifyList.forEach((item) => {
          this.initClassifyOptions.push({label: item.id, name: item.name_cn})
          this.initClassifyModel.push(item.id)
          this.checkedForClassify.push(item.id)
          // this.classifyIDsModel.push(item.id)
        })
        this.getListData()

      } catch (e) {
        console.log(e)
      }
    })();
  },
  methods: {
    getListData () {
      this.loading = true
      const params = {
        page: this.page,
        size: this.size,
        statusArr: JSON.stringify(this.checkedForStatus),
        kycArr: JSON.stringify(this.checkedForKyc),
        recommendArr: JSON.stringify(this.checkedForRecommend),
        deviceArr: JSON.stringify(this.checkedForDevice),
        classifyIDs: JSON.stringify(this.checkedForClassify),
      }
      getDappList(params)
        .then(res => {
          this.loading = false
          this.tableData = res.list
          this.total = res.count
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
    deviceFormat (row) {
      return row.device.join(',')
    },
    protocolFormat (row) {
      return row.protocol.join(',')
    },
    recommendFormat (row) {
      return row.recommend === 1 ? '推荐' : '未推荐'
    },
    handleCheckAllForStatus(val) {
      this.checkedForStatus = val ? this.initStatusModel : []
      this.isIndeterminateForStatus = false
      this.page = 1
      this.getListData()
    },
    handleCheckedForStatus(value) {
      let checkedCount = value.length
      this.checkAllModelForStatus = checkedCount === this.initStatusModel.length
      this.isIndeterminateForStatus = checkedCount > 0 && checkedCount < this.initStatusModel.length
      this.page = 1
      this.getListData()
    },
    handleCheckAllForClassify(val) {
      this.checkedForClassify = val ? this.initClassifyModel : []
      this.isIndeterminateForClassify = false
      this.page = 1
      this.getListData()
    },
    handleCheckedForClassify(value) {
      let checkedCount = value.length
      this.checkAllModelForClassify = checkedCount === this.initClassifyModel.length
      this.isIndeterminateForClassify = checkedCount > 0 && checkedCount < this.initClassifyModel.length
      this.page = 1
      this.getListData()
    },
    handleCheckAllForKyc(val) {
      this.checkedForKyc = val ? this.initKycModel : []
      this.isIndeterminateForKyc = false
      this.page = 1
      this.getListData()
    },
    handleCheckedForKyc(value) {
      let checkedCount = value.length
      this.checkAllModelForKyc = checkedCount === this.initKycModel.length
      this.isIndeterminateForKyc = checkedCount > 0 && checkedCount < this.initKycModel.length
      this.page = 1
      this.getListData()
    },
    handleCheckAllForRecommend(val) {
      this.checkedForRecommend = val ? this.initRecommendModel : []
      this.isIndeterminateForRecommend = false
      this.page = 1
      this.getListData()
    },
    handleCheckedForRecommend(value) {
      let checkedCount = value.length
      this.checkAllModelForRecommend = checkedCount === this.initRecommendModel.length
      this.isIndeterminateForRecommend = checkedCount > 0 && checkedCount < this.initRecommendModel.length
      this.page = 1
      this.getListData()
    },
    handleCheckAllForDevice(val) {
      this.checkedForDevice = val ? this.initDeviceModel : []
      this.isIndeterminateForDevice = false
      this.page = 1
      this.getListData()
    },
    handleCheckedForDevice(value) {
      let checkedCount = value.length
      this.checkAllModelForDevice = checkedCount === this.initDeviceModel.length
      this.isIndeterminateForDevice = checkedCount > 0 && checkedCount < this.initDeviceModel.length
      this.page = 1
      this.getListData()
    },
    handleCurrentChange () {
      this.getListData()
    },
    changeStatusPopup (appId, disabled) {
      if (disabled === 'N') {
        this.$confirm('禁用会导致该产品下架，不可用，并且不可恢复，是否继续操作？', '', {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.changeStatus(appId, disabled)
        });
      } else {
        this.changeStatus(appId, disabled)
      }
    },
    changeStatus (appId, disabled) {
      const disabledDeal = disabled === 'Y' ? 'N' : 'Y'
      const paramsUrl = {
        appId: appId
      }
      const params = {
        disabled: disabledDeal
      }
      this.disabledLoading = true
      disabledDapp(paramsUrl, params)
        .then(() => {
          this.disabledLoading = false
          this.$message({
            message: `${disabledDeal === 'Y' ? '已禁用' : '解禁成功'}`,
            type: 'success'
          });
          this.getListData()
        })
        .catch(() => {
          this.disabledLoading = false
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.dapp-list {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-checkbox-group {
    display: inline-block;
    margin-left: 30px;
  }
  .link {
    color: #FFF;
  }
}

</style>