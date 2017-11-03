import * as type from './mutations_types.js';
import * as func from '../../function.js';

export default {
    [type.SET_ACC](states, obj) {
        states.acc = obj
        let s={acc:states.acc,token:states.token,retoken:states.retoken}
        //func.home.set(s);
        //console.log(states)
    },

    [type.SET_TOKEN](states, obj) {
        states.token = obj
        let s={acc:states.acc,token:states.token,retoken:states.retoken}
        //func.home.set(s);
    },

    [type.SET_RETOKEN](states, obj) {
        states.retoken = obj
        let s={acc:states.acc,token:states.token,retoken:states.retoken}
        //func.home.set(s);
    },

    [type.SET_LOGIN](states, obj) {
        states.login = obj
    },
    
    [type.SET_UINFO](states, obj) {
        states.uinfo = obj
    }
}