<template>
  <div class="lang-con">
    <el-dropdown class="lang-dropdown" @command="handleSetLang" trigger="click">
      <div class="lang-active">
        <div v-for="(lang, i) in langs" :key="`LangActive${i}`" v-show="lang.key === activeLang">{{ lang.value }}<i class="el-icon-arrow-down el-icon--right"></i></div>
      </div>
      <el-dropdown-menu class="lang-menu" slot="dropdown">
        <el-dropdown-item v-for="(lang, i) in langs" :key="`Lang${i}`" :command="lang.key" class="lang-item"><span class="text">{{ lang.value }}</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Lang',
  components: {
  },
  data () {
    return {
      langs: [
        {
          key: 'zh-CN',
          value: '中文'
        },
        {
          key: 'en-US',
          value: 'EngLish'
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      activeLang: 'language'
    })
  },
  watch: {
  },
  created () {
  },
  mounted  () {
  },
  methods: {
    ...mapMutations(['setLanguage']),
    handleSetLang (lang) {
      this.$i18n.locale = lang
      this.setLanguage(lang)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.lang-con {
  margin-right: 10px;
  .lang-dropdown {
    .lang-active {
      cursor: pointer;
    }
  }
}
.lang-menu {
  width: 132px;
  .el-dropdown-menu__item {
    .text {
      vertical-align: middle;
    }
    // &:before {
    //   content: '';
    //   display: inline-block;
    //   vertical-align: middle;
    //   margin-right: 8px;
    //   width: 20px;
    //   height: 13px;
    //   background-position: center center;
    //   background-repeat: no-repeat;
    //   background-size: cover;
    // }
  }
  .lang-item {
    text-align: center;
  }
  // .lang-item-cn {
  //   &:before {
  //     background-image: url('~@/assets/img/lang_cn.png');
  //   }
  // }
  // .lang-item-en {
  //   &:before {
  //     background-image: url('~@/assets/img/lang_en.png');
  //   }
  // }
}
</style>