<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dapp/type' }">Blockchain Application类型管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增类型</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="form-box" :model="signin" :rules="rules" ref="signin" label-width="150px">
      <el-form-item label="类型名称（中）：" prop="nameCn">
        <el-input v-model="signin.nameCn" placeholder="请输入中文类型名称"></el-input>
      </el-form-item>
      <el-form-item label="类型名称（英）：" prop="nameEn">
        <el-input v-model="signin.nameEn" placeholder="请输入英文类型名称"></el-input>
      </el-form-item>
      <el-form-item label="类型图标：" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          :action="`${baseURL}api/v1/images`"
          :show-file-list="false"
          :on-error="handleAvatarError"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="signin.imageUrl" :src="signin.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="添加人：">
        <el-input v-model="signin.author" disabled></el-input>
      </el-form-item>
      <el-form-item label="添加时间：">
        <el-input v-model="signin.date" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:50%;" @click="submitForm('signin')" :loading="loading">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getStorage, dateFormat } from '@/util'
import { addDappType, editDappType } from '@/service'

export default {
  components: {
  },
  data () {
    return {
      pageType: this.$route.path === '/dapp/type/edit' ? 'edit' : 'add',
      signinResult: getStorage('dappType'),
      signin: {
        nameCn: '',
        nameEn: '',
        imageUrl: '',
        author: getStorage('userInfo').username,
        date: dateFormat(+ new Date() / 1000, 'yyyy-MM-dd')
      },
      rules: {
        nameCn: [
          { required: true, message: '请输入中文类型名称', trigger: 'blur' }
        ],
        nameEn: [
          { required: true, message: '请输入英文类型名称', trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '请上传图标', trigger: 'blur' }
        ],
      },
      loading: false,
      loadingForUpload: false
    }
  },
  created () {
    if (this.pageType === 'add') return
    this.signin.nameCn = this.signinResult.name_cn
    this.signin.nameEn = this.signinResult.name_en
    this.signin.imageUrl = this.signinResult.pic
    this.signin.author = this.signinResult.realname
    this.signin.date = dateFormat(this.signinResult.createTime / 1000, 'yyyy-MM-dd')
  },
  mounted  () {
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图标图片只能是 JPG、PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图标图片大小不能超过 2MB!');
      }
      if (isJPG && isLt2M) {
        this.loadingForUpload = true
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res) {
      this.loadingForUpload = false
      this.$message.success('上传成功！')
      if (res.code === 1) {
        this.signin.imageUrl = res.data.url
      }
    },
    handleAvatarError() {
      this.loadingForUpload = false
      this.$message.error('上传失败！')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            name_cn: this.signin.nameCn,
            name_en: this.signin.nameEn,
            pic: this.signin.imageUrl
          }
          this.loading = true
          if (this.pageType === 'edit') {
            let urlParams = { id: this.signinResult.id }
            editDappType(urlParams, params)
              .then(() => {
                this.loading = false
                this.$alert('修改成功', '提示', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.$refs[formName].resetFields()
                    this.$router.push({ path: '/dapp/type' })
                  }
                })
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            addDappType(params)
              .then(() => {
                this.loading = false
                this.$alert('创建成功', '提示', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.$refs[formName].resetFields()
                    this.$router.push({ path: '/dapp/type' })
                  }
                })
              })
              .catch(() => {
                this.loading = false
              })
          }
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