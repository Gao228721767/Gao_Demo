/*
 * @Author: Gao_Sir
 * @Date:   2018-09-27 11:25:05
 * @Last Modified by:   Gao_Sir
 * @Last Modified time: 2018-09-27 11:25:17
 */

'use strict';

// 引入网络请求库 https://github.com/axios/axios

import axios from 'axios'
import store from '../store'
import router from '../router'

// axios.defaults.timeout = 10000
const requestList = []

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.defaults.baseURL = process.env.BASE_URL
// 自定义拦截器
axios.interceptors.request.use((config) => {
    const request = JSON.stringify(config)
    requestList.includes(request) ? console.log('取消重复请求') : requestList.push(request)
    store.dispatch('changeGlobalState', { loading: true })
    const token = store.getters.userInfo.token
    if (token) {
        config.headers.token = token
    }
    return config
}, function(error) {
    return Promise.reject(error)
})

axios.interceptors.response.use(function(response) {
    requestList.splice(requestList.findIndex(item => item === JSON.stringify(response.config)), 1)
    if (requestList.length === 0) {
        store.dispatch('changeGlobalState', { loading: false })
    }
    if (response.data.code === 900401) {
        window.$toast.error('认证失效，请重新登录！', 1000)
        router.push('/login')
    }
    return response
}, function(error) {
    requestList.length = 0
    store.dispatch('changeGlobalState', { loading: false })
    if (axios.isCancel(error)) {
        throw new axios.Cancel('cancel request')
    } else {
        window.$toast.error('网络请求失败！', 1000)
    }
    return Promise.reject(error)
})

const CancelToken = axios.CancelToken
let sources = []

const request = function(url, params, config, method) {
    return new Promise((resolve, reject) => {
        axios[method](url, params, Object.assign(config, {
            cancelToken: new CancelToken(function executor(c) {
                sources.push(c)
            })
        })).then(response => {
            resolve(response.data)
        }, err => {
            reject(err)
        }).catch(err => {
            reject(err)
        })
    })
}

const post = (url, params, config = {}) => {
    return request(url, params, config, 'post')
}

const get = (url, params, config = {}) => {
    return request(url, params, config, 'get')
}

export { sources, post, get }