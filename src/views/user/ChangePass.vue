<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/user/manager' }">后台用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="form-box" :model="signin" :rules="rules" ref="signin" label-width="100px">
      <el-form-item label="旧密码：" prop="oldPassword">
        <el-input type="password" v-model="signin.oldPassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item class="is-required" label="新密码：" prop="newPassword">
        <el-input type="password" v-model="signin.newPassword" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item class="is-required" label="确认密码：" prop="checkPassword">
        <el-input type="password" v-model="signin.checkPassword" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:50%;" @click="submitForm('signin')" :loading="loading">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getStorage } from '@/util'
import { changeManagerPassword } from '@/service'

export default {
  components: {
  },
  data () {
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.signin.newPassword) {
        callback(new Error('两次输入新密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      signin: {
        oldPassword: '',
        newPassword: '',
        checkPassword: '',
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
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
            uid: getStorage('userInfo').uid,
            oldPassword: this.signin.oldPassword,
            newPassword: this.signin.newPassword,
          }
          this.loading = true
          changeManagerPassword(params)
            .then(() => {
              this.loading = false
              this.$alert('修改成功', '提示', {
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