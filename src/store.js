import Vue from "vue";
import Vuex from "vuex";
// import { addLocale, locale } from "core-js";
// import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        nodeId: localStorage.nodeId ? localStorage.nodeId : ''
    },
    mutations:{
        getNodeId(state,value){
            state.nodeId = value;
        }
    },
    actions:{}
})

export default store;
