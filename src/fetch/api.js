import axios from 'axios'
import qs from 'qs'
import * as _ from '../util/toast'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://118.178.95.171:3030/api/v1';

//POST传参序列化
axios.interceptors.request.use((config) => {
    //console.log(_vue)
    //console.log(config.data)
    //console.log(_vue.$store.getters)//('token'))
    if(_vue.$store.getters.token&&_vue.$store.getters.token.length>20){
        //console.log('have token')
        config.headers.Authorization = 'Bearer '+_vue.$store.getters.token;
    } else {
        //console.log('none token')
        config.headers.Authorization = ''
    }
    // if (config.method === 'post') {
    //     config.data = qs.stringify(config.data);
    //     console.log(config.data)
    // }
    return config;
}, (error) => {
    ///_.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
    //console.log('==========')
    console.log(res)
    // console.log(res.data.code)
    _vue.$store.commit('SETTOKEN', res.data.token)
    if (res.status===200) {
        //_.toast(res.data.msg);
        return res;
    } else {
        return Promise.reject(res);
    }
}, (error) => {
    //_.toast("网络异常", 'fail');
    return Promise.reject(error);
});

let _vue;

export default {
    /**
     * 初始化
     */
    init: (vue) => _vue=vue,

    getVue: () => {return _vue},

    /**
     * 用户登录
     */
    login : (params) => axios.post('/auth/login', params),

    /**
     * 用户注册
     */
    register : (params) => axios.post('/auth/register', params),

    /**
     * 修改密码
     */
    modpwd : (params) => axios.put('/auth/modpwd', params),

    /**
     * 重置密码
     */
    resetpwd : (params) => axios.put('/auth/resetpwd', params),

    /**
     * 修改个人信息
     */
    update : (params) => axios.put('/auth/update', params),

    /**
     * 获取个人信息
     */
    getinfo : (params) => axios.get('/auth/getinfo'),

    /**
     * 增加一条记录
     */
    addOneGoods : (params) => axios.post('/os/ysd/goods', params),

    /**
     * 获取符合条件的所有记录
     */
    getAllGoods : (params) => axios.get('/os/ysd/goods', params),

    /**
     * 根据Id获取某一条记录
     */
    getOneGoods : (params) => axios.get('/os/ysd/goods/'+params.id),

    /**
    * 根据Id修改某一条记录
    */
    putOneGoods : (params) => axios.put('/os/ysd/goods/'+params.id, params),

    /**
    * 根据Id删除某一条记录
    */
    deleteOneGoods : (params) => axios.delete('/os/ysd/goods/'+params.id),
}