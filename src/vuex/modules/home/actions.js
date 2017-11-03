import * as type from './mutations_types.js';
import api from '../../../fetch/api';

export default {
    doLogin: ({commit}, param) => {
        api.login(param).then(({data})=>{
            console.log(data)
            if(data.code===200) {
                commit(type.SET_TOKEN, data.token)
                commit(type.SET_LOGIN, true)
            } else {
            }
        }).catch((e)=>{
        })
    },
    setToken: ({commit}, param) => {
        commit(type.SET_TOKEN, param)
    },
    setRetoken: ({commit}, param) => {
        commit(type.SET_RETOKEN, param)
    }
}