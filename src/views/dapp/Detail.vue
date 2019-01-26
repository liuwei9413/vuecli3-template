<template>
  <div>
    <el-breadcrumb class="breadcrumb mb30" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dapp/list' }">产品列表</el-breadcrumb-item>
      <el-breadcrumb-item>产品详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content" v-loading="loading">
      <div class="dapp-head mb30">
        <div class="head-img" :style="`backgroundImage: url(${dappInfo.logo})`"></div>
        <div class="left">
          <div class="left-head">
            <span class="name">{{dappInfo.name}}</span>
            <span class="type">{{dappInfo.type}}</span>
          </div>
          <div class="left-footer">
            <span>{{dappInfo.version}}&nbsp;&nbsp;</span>
            <span>by {{dappInfo.account}}</span>
          </div>
        </div>
        <div class="center">
          <p class="text">类别：<span>{{dappInfo.classifies}}</span></p>
          <p class="text">关键字：<span>{{dappInfo.keywords}}</span></p>
        </div>
        <div class="right">
          <div class="text">
            <p class="label">体验地址：</p>
            <p class="value">
              <a class="link" :href="dappInfo.tryAddress" target="_blank">{{dappInfo.tryAddress}}</a>
            </p>
          </div>
        </div>
      </div>
      <div class="dapp-description clearfix mb30">
        <div class="item">
          <p class="title">版本更新内容：</p>
          <p class="text">{{dappInfo.updateInfo}}</p>
        </div>
        <div class="item">
          <p class="title">产品介绍：</p>
          <p class="text">{{dappInfo.description}}</p>
        </div>
      </div>
      <div class="dapp-ui clearfix mb30">
        <p class="title">产品UI介绍图</p>
        <div class="item" v-for="(item, index) in dappInfo.introducePics" :style="`backgroundImage: url(${item})`" :key="index">
        </div>
      </div>
      <div class="dapp-address clearfix mb30">
        <div class="item">
          <p class="title">社交资料</p>
          <div class="item-inner">
            <div class="text">
              <p class="label">Github：</p>
              <p class="value"><a class="link" :href="dappInfo.github" target="_blank">{{dappInfo.github}}</a></p>
            </div>
            <div class="text">
              <p class="label">Twitter：</p>
              <p class="value"><a class="link" :href="dappInfo.twitter" target="_blank">{{dappInfo.twitter}}</a></p>
            </div>
            <div class="text">
              <p class="label">Facebook：</p>
              <p class="value"><a class="link" :href="dappInfo.facebook" target="_blank">{{dappInfo.facebook}}</a></p>
            </div>
            <div class="text">
              <p class="label">Medium：</p>
              <p class="value"><a class="link" :href="dappInfo.medium" target="_blank">{{dappInfo.medium}}</a></p>
            </div>
            <div class="text">
              <p class="label">Telegram：</p>
              <p class="value"><a class="link" :href="dappInfo.telegram" target="_blank">{{dappInfo.telegram}}</a></p>
            </div>
          </div>
        </div>
        <div class="item">
          <p class="title">合约地址</p>
          <div class="item-inner" v-show="contractsLength > 0">
            <div class="text" v-for="(item, index) in dappInfo.contracts" :key="index">{{item}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  getDappDetail,
} from '@/service.js'

export default {
  components: {
  },
  data () {
    return {
      loading: false,
      dappInfo: {},
      contractsLength: 0,
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
        appId: this.$route.query.appid
      }
      this.loading = true
      getDappDetail(params)
        .then(res => {
          this.loading = false
          this.dappInfo = res
          this.contractsLength = res.contracts.length
        })
        .catch((error) => {
          this.loading = false
          this.$message.error(error.response.data.message)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.content {
  .dapp-head {
    overflow: hidden;
    .head-img {
      margin-right: 20px;
      float: left;
      width: 80px;
      height: 80px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 50%;
    }
    .left {
      float: left;
      width: 300px;
      .left-head {
        .name {
          display: inline-block;
          width: 200px;
          line-height: 40px;
          font-size: 18px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .type {
          display: inline-block;
          line-height: 40px;
          vertical-align: top;
        }
      }
      .left-footer {
        line-height: 40px;
      }
    }
    .center {
      float: left;
      width: 300px;
      .text {
        width: 300px;
        line-height: 40px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
    .right {
      float: left;
      max-width: 400px;
      .label {
        margin-bottom: 10px;
        line-height: 24px;
      }
      .value {
        line-height: 24px;
        .link {
          display: inline-block;
          max-width: 350px;
          color: #409eff;
          word-break: break-word;
        }
      }
      
    }
  }
  .dapp-description {
    .item {
      float: left;
      margin-right: 50px;
      width: 500px;
      &:nth-last-of-type(1) {
        margin-right: 0;
      }
      .title {
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 30px;
      }
      .text {
        padding: 10px;
        overflow-y: scroll;
        height: 400px;
        line-height: 20px;
        border: 1px solid #ebebeb;
        border-radius: 3px;
      }
    }
  }
  .dapp-ui {
    .title {
      margin-bottom: 10px;
      line-height: 40px;
      font-size: 16px;
    }
    .item {
      float: left;
      margin: 0 20px 20px 0;
      width: 300px;
      height: 300px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
  .dapp-address {
    .item {
      float: left;
      margin-right: 50px;
      width: 500px;
      .title {
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 30px;
      }
      .item-inner {
        margin-right: 50px;
        padding: 10px;
        width: 500px;
        border: 1px solid #ebebeb;
        border-radius: 3px;
        &:nth-last-of-type(1) {
          margin-right: 0;
        }
        .text {
          margin-bottom: 10px;
          .label {
            line-height: 24px;
            font-size: 16px;
          }
          .value {
            word-wrap: break-word;
            .link {
              color: #409eff;
            }
          }
        }
      }
    }
  }
}
</style>