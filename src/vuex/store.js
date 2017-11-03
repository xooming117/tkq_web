import Vue from 'vue';
import Vuex from 'vuex';

import home from './modules/home'
//import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({  
  modules: {
    home
  },
  strict: debug
  //plugins: debug ? [createLogger()] : []
});  
  
export default store;  