import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import * as func from '../../function.js';

const state = func.home.get() || {
    //　保存到local
    acc: '',
    token:'',
    retoken:'',

    //　不保存local
    login: '',
    uinfo: {}
}

export default {
    state,
    getters,
    actions,
    mutations
}