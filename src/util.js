import md5 from 'md5'
import base64 from 'base64-js'
import { TextEncoder, TextDecoder } from 'text-encoding'

function strToBase64(str) {
  let uint8array = new TextEncoder('utf-8').encode(str)
  return base64.fromByteArray(uint8array)
}

function fromBase64(base64str) {
  let array = base64.toByteArray(base64str)
  return new TextDecoder('utf-8').decode(array)
}

export const encrypt = function(str) {
  return md5(str)
}

export const setStorage = function(key, obj) {
  let json = JSON.stringify(obj)
  window.localStorage.setItem(key, strToBase64(json))
}

export const getStorage = function(key) {
  const str = window.localStorage.getItem(key)
  if (!str) {
    return null
  }
  const jsonStr = fromBase64(str)
  return JSON.parse(jsonStr)
}

export const clear = function() {
  window.localStorage.clear()
}

export const removeStorage = function(key) {
  window.localStorage.removeItem(key)
}