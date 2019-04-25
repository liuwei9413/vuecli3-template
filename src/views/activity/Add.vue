<template>
  <div v-loading="loadingForUpload">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/activity/list' }">Banner列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加banner</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="form-box" :model="signin" :rules="rules" ref="signin" label-width="150px">
      <el-form-item label="banner名称：" prop="name">
        <el-input v-model="signin.name" placeholder="请输入banner名称"></el-input>
      </el-form-item>
      <el-form-item label="banner图：" prop="pic">
        <el-upload
          class="avatar-uploader"
          :action="`${baseURL}api/v1/images`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload">
          <img v-if="signin.pic" :src="signin.pic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">支持扩展名：.png .jpg.&nbsp;&nbsp;&nbsp;&nbsp;尺寸：1680*458&nbsp;&nbsp;&nbsp;&nbsp;大小1-5M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="跳转链接：" prop="url">
        <el-input v-model="signin.url" placeholder="请输入banner跳转链接"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:50%;" @click="submitForm('signin')" :loading="loading">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addBanner } from '@/service'

export default {
  components: {
  },
  data () {
    return {
      signin: {
        name: '',
        url: '',
        pic: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入banner名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入banner跳转链接', trigger: 'blur' }
        ],
        pic: [
          { required: true, message: '请上传banner图', trigger: 'blur' }
        ],
      },
      loading: false,
      loadingForUpload: false,
    }
  },
  created () {
  },
  mounted  () {
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt5M = file.size / 1024 / 1024 <= 5;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!');
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      if (isJPG && isLt5M) {
        this.loadingForUpload = true
      }
      return isJPG && isLt5M;
    },
    handleAvatarSuccess(res) {
      this.loadingForUpload = false
      this.$message.success('上传成功！')
      if (res.code === 1) {
        this.signin.pic = res.data.url
      }
    },
    handleAvatarError() {
      this.loadingForUpload = false
      this.$message.error('上传失败！')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const params = this.signin
          addBanner(params)
            .then(() => {
              this.loading = false
              this.$alert('添加成功', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                  this.$refs[formName].resetFields()
                  this.$router.push({ path: '/activity/list' })
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