<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/user/manager' }">后台用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>生成后台用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="form-box" :model="signin" :rules="rules" ref="signin" label-width="100px">
      <el-form-item label="姓名：" prop="username">
        <el-input v-model="signin.username" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="signin.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item class="is-required" label="初始密码：" prop="password">
        <el-input type="password" v-model="signin.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="is-required" label="确认密码：" prop="checkPassword">
        <el-input type="password" v-model="signin.checkPassword" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:50%;" @click="submitForm('signin')" :loading="loading">生成后台人员</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { registerManager } from '@/service'

export default {
  components: {
  },
  data () {
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.signin.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      signin: {
        username: '',
        email: '',
        password: '',
        checkPassword: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePassword2, trigger: 'blur' }
        ],
      },
      loading: false
    }
  },
  created () {
  },
  mounted  () {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            realname: this.signin.username,
            username: this.signin.email,
            password: this.signin.password
          }
          this.loading = true
          registerManager(params)
            .then(() => {
              this.loading = false
              this.$alert('创建成功', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                  this.$refs[formName].resetFields()
                  this.$router.push({ path: '/user/manager' })
                }
              })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>