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

export const getAccountList = function (params) {
  let url = `/versions?page=${params.currentPage - 1}&size=${params.pageSize}`
  if (params.order !== '') {
    url += `&order=${params.order}`
  }
  console.log(url, params)
  return fetch('/json/accountList.json', 'get')
  // return fetch(url, 'get')
}

export const getVersionsList = function (params) {
  let url = `/versions?page=${params.currentPage - 1}&page_size=${params.pageSize}`
  if (params.order !== '') {
    url += `&order=${params.order}`
  }
  if (params.update !== '') {
    url += `&update=${params.update}`
  }
  if (params.platform !== '') {
    url += `&platform=${params.platform}`
  }
  return fetch(url, 'get')
}

export const getLatestVersionInfo = function () {
  return fetch('/versions/latest', 'get')
}

export const addVersion = function (params) {
  return fetch('/versions', 'post', params)
}

export const getVersionInfo = function (id) {
  return fetch(`/versions/${id}`, 'get')
}

export const editVersion = function (params) {
  return fetch(`/versions/${params.id}`, 'post', params)
}