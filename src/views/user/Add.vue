<template>
  <div>
    <el-form class="register" :model="signin" :rules="rules" ref="signin" label-width="100px">
      <el-form-item label="姓名：" prop="username">
        <el-input v-model="signin.username" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="signin.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="初始密码：" prop="password">
        <el-input v-model="signin.password" type="password" placeholder="请输入初始密码" @keyup.native.enter="submitForm('signin')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:50%;" @click="submitForm('signin')" :loading="loading">生成后台人员</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { registerAccount } from '@/service'

export default {
  components: {
  },
  data () {
    return {
      signin: {
        username: '',
        password: '',
        email: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
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
          this.loading = true
          registerAccount(this.signin)
            .then(() => {
              this.loading = false
              this.$alert('创建成功', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                  this.$refs[formName].resetFields()
                  // this.$message({
                  //   type: 'info',
                  //   message: `action: ${ action }`
                  // })
                }
              })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.register {
  margin: 50px 0 0 50px;
  width: 600px;
}
</style>