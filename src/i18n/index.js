import Vue from 'vue'
import VueI18n from 'vue-i18n'

import elen from 'element-ui/lib/locale/lang/en'
import elcn from 'element-ui/lib/locale/lang/zh-CN'
import { getStorage, removeStorage, getBrowserLang } from '@/util'

import enLocale from './en-US'
import cnLocale from './zh-CN'

Vue.use(VueI18n)

const lang = getStorage('lang') || getBrowserLang()
// 如果localStorage.lang 无法识别 清除掉
if ( lang !== 'zh-CN' && lang !== 'en-US' ) {
  removeStorage('lang')
  window.location.reload()
}

const messages = {
  'en-US': {
    ...elen,
    ...enLocale
  },
  'zh-CN': {
    ...elcn,
    ...cnLocale
  }
}
const i18n = new VueI18n({
  locale: lang,
  messages
})

export default i18n