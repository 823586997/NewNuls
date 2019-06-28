import Vue from "vue";
import Vuex from "vuex";
// import { addLocale, locale } from "core-js";
// import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        nodeId: localStorage.nodeId,
        role: localStorage.role,
    },
    mutations:{
        getNodeId(state,nodeId){
            localStorage.nodeId = nodeId;
            state.nodeId = nodeId;
        },
        getRole(state,role){
            localStorage.role = role;
            state.role = role;
        },
    },
    actions:{}
})

export default store;
