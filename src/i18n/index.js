import Vue from 'vue'
import VueI18n from 'vue-i18n'

import elen from 'element-ui/lib/locale/lang/en'
import elcn from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale/'
import * as utils from '@/util'

import en from './en-US'
import cn from './zh-CN'

Vue.use(VueI18n)

let browserLang = navigator.language ? navigator.language : navigator.browserLanguage
let defaultBrowserLang = ''
if (browserLang.toLowerCase() === 'cn' || browserLang.toLowerCase() === 'zh' || browserLang.toLowerCase() === 'zh-cn') {
  defaultBrowserLang = 'cn'
} else {
  defaultBrowserLang = 'en'
}

const lang = utils.getStorage('lang') || defaultBrowserLang
if (lang === 'en') {
  utils.setStorage('lang', 'en')
} else if (lang === 'cn') {  
  utils.setStorage('lang', 'cn')
} else {
  utils.removeStorage('lang')
  window.location.reload()
}

// element i18n config
locale.use(lang === 'cn' ? elcn : elen)

const i18n = new VueI18n({
  locale: lang,
  messages: {
    en,
    cn
  }
})
export default i18n
