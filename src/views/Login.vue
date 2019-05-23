<template>
  <div class="login-container">
    <el-form class="login-form" :model="signin" :rules="rules" ref="signin">
      <div class="title-container">
        <h3 class="title">H S M</h3>
      </div>
      <el-form-item prop="username">
        <el-input v-model="signin.username" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="signin.password" type="password" placeholder="请输入密码" @keyup.native.enter="submitForm('signin')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="submitForm('signin')" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
    <el-input v-model="message"></el-input>
  </div>
</template>

<script>
import { setStorage } from '@/util'
import { login } from '@/service'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      testData: '1',
      signin: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  computed: {
    ...mapState({
      message2: state => state.obj.message2
    }),
    message: {
      get () {
        return this.$store.state.obj.message
      },
      set (value) {
        this.$store.commit('updateMessage', value)
      }
    },
    accountInfo () {
      return this.$store.state.accountInfo
    },
    ...mapState({
      aliasAccount: state => state.accountInfo
    }),
    ...mapGetters({
      doubleAccount: 'doubleAccount'
    })
  },
  created () {
  },
  mounted  () {
    (async () => {
      console.log(this.accountInfo)

      console.log('mapState:' + JSON.stringify(this.aliasAccount))
      console.log('mapGetters:' + JSON.stringify(this.doubleAccount))

      // await this.$store.dispatch('accountInfoAction')
      await this.accountInfoAction({ preload: true })
      console.log(this.accountInfo)
      console.log('mapState:' + JSON.stringify(this.aliasAccount))
      console.log('mapGetters:' + JSON.stringify(this.doubleAccount))
    })()
  },
  methods: {
    ...mapActions(['accountInfoAction']),
    handleUpdateMessage (e) {
      debugger
      this.$store.commit('updateMessage2', e.target.value)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if ( !valid ) return false

        this.loading = true
        login(this.signin)
          .then((res) => {
            this.loading = false
            // console.log(res)
            setStorage('userInfo', res)
            this.$router.push({ path: '/' })
          })
          .catch((error) => {
            this.loading = false
            console.log(error)
          })
      })
    }
  }
}
</script>
<style lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>