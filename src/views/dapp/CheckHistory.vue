<template>
  <div>
    <el-breadcrumb class="breadcrumb mb30" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dapp/check' }">Dapp审核</el-breadcrumb-item>
      <el-breadcrumb-item>历史审核记录</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content" v-loading="loading">
      <div class="baseinfo">
        <div class="item">
          <div class="label">产品名称：</div>
          <div class="value">{{dappInfo.appInfo.name}}</div>
        </div>
        <div class="item">
          <div class="label">类别：</div>
          <div class="value">{{dappInfo.appInfo.classifies}}</div>
        </div>
        <div class="item">
          <div class="label">开发者：</div>
          <div class="value">{{dappInfo.appInfo.account}}</div>
        </div>
        <div class="item">
          <div class="label">体验链接：</div>
          <div class="value">
            <a :href="dappInfo.appInfo.tryAddress" target="_blank">{{dappInfo.appInfo.tryAddress}}</a>
          </div>
        </div>
        <div class="item">
          <div class="label">开发状态：</div>
          <div class="value">{{dappInfo.appInfo.type}}</div>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in dappInfo.list" :key="index">
          <div class="head">
            <span class="head-item">提交时间：{{item.submitTime | dateFormatFilter('yyyy-MM-dd hh:mm')}}</span>
            <span class="head-item">提交版本：{{item.version}}</span>
            <span class="head-item">审核时间：{{item.auditTime | dateFormatFilter('yyyy-MM-dd hh:mm')}}</span>
            <span class="head-item">审核人：{{item.admin}}</span>
            <span class="head-item">审核结果：{{item.status === 1 ? '通过' : '不通过'}}</span>
            <span class="head-item" v-show="!!item.reason">不通过原因：{{item.reason}}</span>
          </div>
          <div class="box">
            <div class="label">版本更新内容：</div>
            <div class="value">{{item.updateInfo}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { dateFormat } from '@/util'
import { 
  getAuditDappHistory,
} from '@/service.js'

export default {
  components: {
  },
  data () {
    return {
      loading: false,
      dappInfo: {
        appInfo: {},
        list: []
      },
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.getDappInfo()
  },
  methods: {
    getDappInfo () {
      const params = {
        appId: this.$route.query.id
      }
      this.loading = true
      getAuditDappHistory(params)
        .then(res => {
          this.loading = false
          this.dappInfo.appInfo = res.appInfo
          this.dappInfo.list = res.list
        })
        .catch(() => {
          this.loading = false
          setTimeout(() => {
            this.$router.push({path: '/dapp/check'})
          }, 2000)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.content {
  .baseinfo {
    .item {
      margin-bottom: 20px;
      line-height: 30px;
      .label {
        display: inline-block;
      }
      .value {
        display: inline-block;        
      }
    }
  }
  .list {
    .item {
      margin-bottom: 30px;
      background: #f2f2f2;
      .head {
        padding: 0 5px;
        line-height: 40px;
        border: 1px solid #ebebeb;
        border-radius: 3px 3px 0 0;
        .head-item {
          margin-right: 30px;
        }
      }
      .box {
        padding: 10px 5px;
        border: 1px solid #ebebeb;
        border-top: none;
        border-radius: 0 0 3px 3px;
        .label {
          line-height: 40px;
        }
        .value {
          padding: 5px 20px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>