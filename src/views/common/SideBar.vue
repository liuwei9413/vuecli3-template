<template>
  <section class="sidebar">
    <el-menu router unique-opened :default-active="activeIndex" @select="handleSelect">
      <el-submenu :index="item.path" v-for="(item, index) in homeRoutes" :key="index">
        <template slot="title">
          <span>{{item.meta.title}}</span>
        </template>
        <el-menu-item :index="item2.path" v-for="(item2, index2) in item.children" :key="index2" v-show="!item2.hidden">{{item2.meta.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </section>
</template>

<script>

export default {
  name: 'SideBar',
  components: {
  },
  data () {
    return {
      activeIndex: this.$route.path
    }
  },
  computed: {
    homeRoutes: function () {
      return this.$router.options.routes[0].children
    }
  },
  watch: {
    '$route': 'changeRoutes'
  },
  created () {
  },
  mounted  () {
    // console.log(this.$router.options.routes[0].children)
  },
  methods: {
    handleSelect (key) {
      console.log(key)
      // this.$router.push({ path: key })
    },
    changeRoutes () {
      this.activeIndex = this.$route.path
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.sidebar {
  .el-menu {
    border-right: none;
  }
}
</style>