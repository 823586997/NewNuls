<template>
    <div class="header">
        <div class='logo'>
            <img src="../static/images/logo.png" alt="">
        </div>
        <div class='nav' >
            <span @click='nav()'></span>
            <transition name="fade">
                <ul v-if='flag'>
                    <li @click='Home()'>首页</li>
                    <li v-if=" role == 'user' " @click='nodeInfo()'>节点管理</li>
                    <li @click='user()'>账户管理</li>
                    <li @click='login()'>{{ id ? '退出' : '登录' }}</li>
                </ul>
            </transition>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: '',
    data() {
        return {
            flag : false,
            id: localStorage.nodeId ? localStorage.nodeId : '',
            role : localStorage.role ? localStorage.role : '',
        }
    },
    methods:{
        nav(){
            this.flag = !this.flag;
        },
        Home(){
            this.$router.push('/');
            this.flag = !this.flag;
        },
        // 登录退出
        login(){
            if(this.id){
                let url = 'http://nuls.yqkkn.com:9898/passport/logout';
                axios.get(url)
                .then( (res) => {
                    localStorage.clear();
                    location.reload();
                    this.$message('您已成功退出登录');
                })
            }else{
                this.$router.push('/login');
            }
            this.flag = !this.flag;
        },
        // 节点管理
        nodeInfo(){
            this.$router.push({path: '/details' , query: { id : this.id }});
            this.flag = !this.flag;
        },
        // 账户管理
        user(){
            if( this.id ){
                this.$router.push({path: '/amendPasswd'});
                this.flag = !this.flag;
            }else{
                this.$message('请先登录在进行账户管理操作');
            }
        }
    }
}
</script>

<style scoped lang='scss'>
.header{
    width: 100%;
    height: 59px;
    background: white;
    position: fixed;
    top: 0;
    display: flex;
    border-bottom: 1px solid #ddd;
    z-index: 10;
    .logo{
        flex: 1;
        display: flex;
        align-items: center;
        >img{
            margin-left: 10px;
            width: 100px;
            height: 40px;
            align-items: center;
        }
    }
    .nav{
        position: relative;
        width: 80px;
        text-align: center;
        line-height: 70px;
        >span{
            width: 25px;
            height: 25px;
            display: inline-block;
            background: url('../static/images/nav.png') no-repeat center;
            background-size: 25px;
        }
        >ul{
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            z-index: 20;
            >li{
                text-align: center;
                line-height: 30px;
                background: white;
            }
        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
