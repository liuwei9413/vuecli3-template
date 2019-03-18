<template>
  <header class="clearfix">
    <div class="title">VechainWorld</div>
    <div class="welcome">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/user/manager/changepass" style="text-decoration: none; color: #606266;">修改密码</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="logout" @click="logout" v-loading.fullscreen.lock="loading">退出</span>
    </div>   
  </header>
</template>

<script>
import { removeStorage, getStorage } from '@/util'
import { logout } from '@/service'

export default {
  name: 'Header',
  components: {
  },
  data () {
    return {
      loading: false,
      username: getStorage('userInfo').username
    }
  },
  created () {
  },
  mounted  () {
  },
  methods: {
    logout () {
      this.loading = true
      logout()
        .then(() => {
          this.loading = false
          removeStorage('userInfo')
          this.$router.push({ path: '/login' })
        })
        .catch((error) => {
          this.loading = false
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$bgcolor_header: #409eff;
$color_header: #ffffff;
header {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  color: $color_header;
  background-color: $bgcolor_header;
  .title {
    float: left;
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .welcome {
    float: right;
    padding-right: 20px;
    height: 60px;
    line-height: 60px;
    span {
      margin-right: 10px;
    }
    .logout {
      cursor: pointer;
    }
    .el-dropdown {
      margin-right: 10px;
      color: #FFF;
      .el-dropdown-link {
        cursor: pointer;
      }
    }
  }
}
</style>