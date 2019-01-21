import {fetch} from '@/axios.js'

export const login = function (params) {
  return fetch('/api/v1/login', 'post', params)
}

export const logout = function (params) {
  return fetch('/api/v1/logout', 'post', params)
}

export const registerManager = function (params) {
  return fetch('/api/v1/admins', 'post', params)
}

export const getUserAccountList = function (params) {
  let url = `/api/v1/accounts?page=${params.page}&size=${params.size}&search=${params.search}`
  return fetch(url, 'get')
}

export const deleteUserAccount = function (params) {
  let url = `/api/v1/accounts/${params.id}/disabled`
  return fetch(url, 'post', { disabled: params.disabled })
}

export const getManagerList = function (params) {
  let url = `/api/v1/admins?page=${params.page}&size=${params.size}`
  return fetch(url, 'get')
}

export const disabledManager = function (params) {
  let url = `/api/v1/admins/${params.uid}/disabled`
  let paramsDeal = { disabled: params.disabled }
  return fetch(url, 'post', paramsDeal)
}

export const changeManagerPassword = function (params) {
  let paramsDeal = {
    action: "change",
    oldPassword: params.oldPassword,
    newPassword: params.newPassword,
  }  
  return fetch(`/api/v1/admins/${params.uid}/password`, 'post', paramsDeal)
}

export const resetManagerPass = function (params) {
  let url = `/api/v1/admins/${params.uid}/password`
  return fetch(url, 'post', { action: "reset" })
}

export const getDappTypeList = function () {
  let url = `/api/v1/classifies`
  return fetch(url, 'get')
}

export const sortDappTypeList = function (params) {
  let url = `/api/v1/classifies/total/index`
  return fetch(url, 'post', params)
}

export const deleleDappType = function (params) {
  let url = `/api/v1/classifies/${params.id}/disabled`
  return fetch(url, 'post', { disabled: "Y" })
}

export const addDappType = function (params) {
  let url = `/api/v1/classifies`
  return fetch(url, 'post', params)
}

export const editDappType = function (urlParams, params) {
  let url = `/api/v1/classifies/${urlParams.id}/info`
  return fetch(url, 'post', params)
}

export const getBannerList = function () {
  let url = `/api/v1/banners`
  return fetch(url, 'get')
}

export const sortBannerList = function (params) {
  let url = `/api/v1/banners/total/index`
  return fetch(url, 'post', params)
}

export const deleleBanner = function (params) {
  let url = `/api/v1/banners/${params.id}/disabled`
  return fetch(url, 'post', { disabled: "Y" })
}

export const addBanner = function (params) {
  let url = `/api/v1/banners`
  return fetch(url, 'post', params)
}

export const getAuditDappList = function (params) {
  let url = `/api/v1/audits?page=${params.page}&size=${params.size}`
  return fetch(url, 'get')
}

export const getAuditDappListHistory = function (params) {
  let url = `/api/v1/dapplogs?page=${params.page}&size=${params.size}`
  return fetch(url, 'get')
}

export const getAuditDappDetail = function (params) {
  let url = `/api/v1/audits/${params.id}`
  return fetch(url, 'get')
}

export const getAuditDappDetailForLast = function (params) {
  let url = `/api/v1/dapplogs/${params.appId}`
  return fetch(url, 'get')
}

export const auditDapp = function (urlParams, params) {
  let url = `/api/v1/audits/${urlParams.id}/status`
  return fetch(url, 'post', params)
}

export const getAuditDappHistory = function (params) {
  let url = `/api/v1/dapplogs/${params.appId}`
  return fetch(url, 'get')
}
