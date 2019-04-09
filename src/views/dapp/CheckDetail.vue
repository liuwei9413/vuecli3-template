<template>
  <div>
    <el-breadcrumb class="breadcrumb mb30" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dapp/check' }">Blockchain Application审核</el-breadcrumb-item>
      <el-breadcrumb-item>提交详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content" v-loading="loading || loadingForAudit">
      <div class="dapp-head mb30">
        <div class="head-img" :style="`backgroundImage: url(${dappInfo.logo})`"></div>
        <div class="baseinfo">
          <div class="name">
            <span v-for="item in dappInfo.languages" :key="item.language">{{item.name}}&nbsp;</span>
          </div>
          <div>
            <span>{{dappInfo.version}}&nbsp;&nbsp;</span>
            <span>by {{dappInfo.developerName}}</span>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="list-item">
          <div class="title">当前版本内容：</div>
          <div class="item">
            <div class="label">开发状态：</div>
            <div class="value">{{dappInfo.type}}</div>
          </div>
          <div class="item">
            <div class="label">类别：</div>
            <div class="value">{{formatDappClassify}}</div>
          </div>
          <div class="item">
            <div class="label">体验链接：</div>
            <div class="value">
              <a :href="dappInfo.tryAddress" target="_blank">{{dappInfo.tryAddress}}</a>
            </div>
            <div class="value value-developer" v-show="sameTryAddressAccountsLength > 0">
              <p class="p">链接已被占用</p>
              <p class="p" v-for="(item, index) in dappInfo.sameTryAddressAccounts" :key="index"><span>开发者：</span><span>{{`${item.developerName}（${item.email}）`}}</span></p>
            </div>
          </div>
          <div class="item">
            <div class="label">产品logo：</div>
            <div class="value logo" :style="`backgroundImage: url(${dappInfo.logo})`"></div>
          </div>
          <div class="item" v-for="(item) in dappInfo.languages" :key="item.language + 1">
            <div class="label">产品UI图<span>（{{item.language === 'EN' ? '英' : '中'}}）</span>：</div>
            <div class="value clearfix">
              <div class="ui" v-for="(item2, index2) in item.introducePics" :key="index2" :style="`backgroundImage: url(${item2})`" @click="openImg(item2)"></div>
            </div>
          </div>
          <div class="item">
            <div class="label">合约地址：</div>
            <div class="value">
              <p v-for="(item, index) in dappInfo.contracts" :key="index">{{item}}</p>
            </div>
          </div>
          <div class="item">
            <div class="label">github地址：</div>
            <div class="value">{{dappInfo.github}}</div>
          </div>
          <div class="item">
            <div class="label">twitter地址：</div>
            <div class="value">{{dappInfo.twitter}}</div>
          </div>
          <div class="item">
            <div class="label">medium地址：</div>
            <div class="value">{{dappInfo.medium}}</div>
          </div>
          <div class="item">
            <div class="label">facebook地址：</div>
            <div class="value">{{dappInfo.facebook}}</div>
          </div>
          <div class="item">
            <div class="label">telegram地址：</div>
            <div class="value">{{dappInfo.telegram}}</div>
          </div>
          <div class="item">
            <div class="label">支持设备：</div>
            <div class="value">{{deviceFormat}}</div>
          </div>
          <div class="item">
            <div class="label">支持协议：</div>
            <div class="value">{{protocolFormat}}</div>
          </div>
        </div>
        <div class="list-item" v-if="dappInfoForLastHasShow">
          <div class="title">上一版本内容：</div>
          <div class="item">
            <div class="label">开发状态：</div>
            <div class="value">{{dappInfoForLast.type}}</div>
          </div>
          <div class="item">
            <div class="label">类别：</div>
            <div class="value">{{formatDappClassifyForLast}}</div>
          </div>
          <div class="item">
            <div class="label">体验链接：</div>
            <div class="value">
              <a :href="dappInfoForLast.tryAddress" target="_blank">{{dappInfoForLast.tryAddress}}</a>
            </div>
          </div>
          <div class="item">
            <div class="label">产品logo：</div>
            <div class="value logo" :style="`backgroundImage: url(${dappInfoForLast.logo})`"></div>
          </div>
          <div class="item" v-for="(item) in dappInfoForLast.languages" :key="item.language + 10">
            <div class="label">产品UI图<span>（{{item.language === 'EN' ? '英' : '中'}}）</span>：</div>
            <div class="value clearfix">
              <div class="ui" v-for="(item2, index2) in item.introducePics" :key="index2" :style="`backgroundImage: url(${item2})`" @click="openImg(item2)"></div>
            </div>
          </div>
          <div class="item">
            <div class="label">合约地址：</div>
            <div class="value">
              <p v-for="(item, index) in dappInfoForLast.contracts" :key="index">{{item}}</p>
            </div>
          </div>
          <div class="item">
            <div class="label">github地址：</div>
            <div class="value">{{dappInfoForLast.github}}</div>
          </div>
          <div class="item">
            <div class="label">twitter地址：</div>
            <div class="value">{{dappInfoForLast.twitter}}</div>
          </div>
          <div class="item">
            <div class="label">medium地址：</div>
            <div class="value">{{dappInfoForLast.medium}}</div>
          </div>
          <div class="item">
            <div class="label">facebook地址：</div>
            <div class="value">{{dappInfoForLast.facebook}}</div>
          </div>
          <div class="item">
            <div class="label">telegram地址：</div>
            <div class="value">{{dappInfoForLast.telegram}}</div>
          </div>
          <div class="item">
            <div class="label">支持设备：</div>
            <div class="value">{{deviceFormatForLast}}</div>
          </div>
          <div class="item">
            <div class="label">支持协议：</div>
            <div class="value">{{protocolFormatForLast}}</div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="list-item" v-for="item in dappInfo.languages" :key="item.language + 2">
          <div class="item">
            <div class="label">版本更新内容<span>（{{item.language === 'EN' ? '英' : '中'}}）</span>：</div>
            <div class="value">{{item.updateInfo}}</div>
          </div>
          <div class="item">
            <div class="label">产品介绍<span>（{{item.language === 'EN' ? '英' : '中'}}）</span>：</div>
            <div class="value">{{item.description}}</div>
          </div>
        </div>
      </div>
      <div class="btns">
        <el-button type="primary" @click="handlePassPopup">通过</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">不通过</el-button>
      </div>
    </div>
    <el-dialog title="输入不通过的原因" :visible.sync="dialogFormVisible">
      <el-form :model="auditForm" ref="auditForm">
        <el-form-item label="中文原因" label-width="120px">
          <el-input v-model.trim="auditForm.reasonCN" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文原因" label-width="120px">
          <el-input v-model.trim="auditForm.reasonEN" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleNoPass">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="imgVisible" :show-close="false" class="img-dialog">
      <div class="img-content" :style="`backgroundImage: url(${dialogImgUrl})`">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { 
  getAuditDappDetail,
  getDappTypeList,
  auditDapp,
  getAuditDappDetailForLast
} from '@/service.js'

export default {
  components: {
  },
  data () {
    return {
      id: this.$route.query.id,
      appId: this.$route.query.appid,
      loading: false,
      dappClassify: [],
      dappInfo: {},
      sameTryAddressAccountsLength: 0,
      deviceFormat: '',
      protocolFormat: '',
      deviceFormatForLast: '',
      protocolFormatForLast: '',
      formatDappClassify: '',
      loadingForAudit: false,
      loadingForLast: false,
      dappInfoForLastHasShow: false,
      dappInfoForLast: [],
      formatDappClassifyForLast: '',
      dialogFormVisible: false,
      imgVisible: false,
      dialogImgUrl: '',
      auditForm: {
        reasonCN: '',
        reasonEN: '',
      },
      // rules: {
      //   reasonCN: [
      //     { required: true, message: '请输入中文版原因', trigger: 'blur' }
      //   ],
      //   reasonEN: [
      //     { required: true, message: '请输入英文版原因', trigger: 'blur' }
      //   ],
      // },
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    (async () => {
      try {
        let dappTypeList = await getDappTypeList()
        this.dappClassify = dappTypeList.list
      } catch (e) {
        this.$message.error(e)
      }
      this.getDappInfo()
      this.getDappInfoForLast()
    })()
  },
  methods: {
    getDappInfo () {
      const params = {
        id: this.id
      }
      this.loading = true
      getAuditDappDetail(params)
        .then(res => {
          let dappTypeValue = []
          this.loading = false
          this.dappInfo = res
          this.sameTryAddressAccountsLength = this.dappInfo.sameTryAddressAccounts.length
          this.deviceFormat = this.dappInfo.device.join(',')
          this.protocolFormat = this.dappInfo.protocol.join(',')
          this.dappClassify.forEach((item) => {
            this.dappInfo.classifyIDs.forEach((item2) => {
              if (item2 === item.id) {
                dappTypeValue.push(item.name_cn)
              }
            })
          })
          this.formatDappClassify = dappTypeValue.join(',')
        })
        .catch((error) => {
          this.loading = false
          this.$message.error(error.response.data.message)
        })
    },
    getDappInfoForLast () {
      const params = {
        appId: this.appId
      }
      this.loadingForLast = true
      getAuditDappDetailForLast(params)
        .then(res => {
          let dappTypeValue = []
          this.loadingForLast = false
          if (!res) return
          this.dappInfoForLastHasShow = true
          this.dappInfoForLast = res
          this.deviceFormatForLast = this.dappInfoForLast.device.join(',')
          this.protocolFormatForLast = this.dappInfoForLast.protocol.join(',')
          this.dappClassify.forEach((item) => {
            this.dappInfoForLast.classifyIDs.forEach((item2) => {
              if (item2 === item.id) {
                dappTypeValue.push(item.name_cn)
              }
            })
          })
          this.formatDappClassifyForLast = dappTypeValue.join(',')
        })
        .catch(() => {
          this.dappInfoForLastHasShow = false
          this.loadingForLast = false
        })
    },
    openImg(url) {
      console.log(url)
      if (url) {
        this.imgVisible = true
        this.dialogImgUrl = url
      }
    },
    handleNoPass () {
      let params = {
        status: 0,
        reasonCN: this.auditForm.reasonCN,
        reasonEN: this.auditForm.reasonEN
      }
      if (this.auditForm.reasonCN || this.auditForm.reasonEN) {
        this.handleAuditDapp(params)
      } else {
        this.$message.error('请至少填写一个语言的原因')
      }
      // this.$refs['auditForm'].validate((valid) => {
      //   if (valid) {
      //     this.handleAuditDapp(params)
      //   } else {
      //     return false
      //   }
      // })
    },
    handlePassPopup() {
      this.$confirm('是否确认审核通过？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.handleAuditDapp({status: 1})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
      // this.$alert('是否确认审核通过？', '提示', {
      //   confirmButtonText: '确定',
      //   callback: () => {
      //     this.handleAuditDapp({status: 1})
      //   }
      // })
    },
    handleAuditDapp(params) {
      const paramsUrl = {
        id: this.id,
        updateTime: this.dappInfo.updateTime
      }
      this.loadingForAudit = true
      auditDapp(paramsUrl, params)
        .then(() => {
          this.loadingForAudit = false
          this.dialogFormVisible = false
          this.handleAction()
        })
        .catch(() => {
          this.loadingForAudit = false
        })
    },
    handleAction() {
      this.$alert('审核完成', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          this.$router.push('/dapp/check')
        }
      })
    }
  }
}
</script>

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
    .baseinfo {
      .name {
        line-height: 40px;
        font-size: 20px;
      }
    }
  }
  .list {
    display: flex;
    .list-item {
      flex: 1;
      padding: 10px;
      .title {
        margin-bottom: 40px;
        font-size: 16px;
        line-height: 30px;
        border-bottom: 2px solid #222;
        padding-bottom: 10px;
      }
      .item {
        margin-bottom: 30px;    
        border-bottom: 1px solid #f2f2f2;
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 4px;
        .label {
          margin-bottom: 10px;
          line-height: 30px;
          font-size: 16px;
          font-weight: 500;
        }
        .value {
          margin: 0 10px;
          .ui {
            float: left;
            margin-right: 12px;
            width: 100px;
            height: 100px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            cursor: pointer;
          }
        }
        .value-developer {
          margin-top: 10px;
          color: #f56c6c;
          .p {
            line-height: 20px;
          }
        }
        .logo {
          width: 60px;
          height: 60px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
    }
  }
  .btns {
    margin-top: 50px;
    text-align: center;
    .el-button {
      margin-right: 50px;
    }
  }
}
</style>