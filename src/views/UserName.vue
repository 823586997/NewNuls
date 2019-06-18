<template>
   <div class="login">

        <el-row class="loginWrap">
            <el-col :xs="19" :sm="20" :md="20" :lg="8" :xl="5" class="grid-content bg-purple">
                <div class='login-cen'>
                    <form>
                        <div class='hint'>请设置您的用户名</div>
                        <el-input v-model="userName" placeholder="注：一个账户只可以设置一次用户名"></el-input>
                        <div class='btn'>
                            <button @click='Login($event)'>提交</button>
                        </div>
                    </form>
                </div>
            </el-col>
        </el-row>

   </div>
</template>

<script>

import axios from 'axios';
export default {
    name: '',
    data() {
        return {
            userName:''
        }
    },
    methods:{
        Login(e){
            let that = this;
            if( this.userName != '' ){
                e.preventDefault();
                let formData = new FormData();
                formData.append('username', this.userName);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                axios.post('http://nuls.yqkkn.com:9898/admin/changeUsername', formData, config)
                .then(function (res) {
                    let data = res.data;
                    if( data.code == 0 ){
                        location.reload();
                        that.$router.push('/');
                        that.$message('设置成功');
                    }else{
                        that.$message(data.msg);
                    }
                })
            }else{
                that.$message('请输入您的用户名');
            }
        }
    }
}
</script>

<style scoped lang='scss'>
.login{
    width: 100%;
    height: 100%;
    background: #F9FAFD;
    .login-cen{
        width: 100%;
        height: 250px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        background: #F9FAFD;
        padding: 10px;
        .hint{
            width: 100%;
            text-align: center;
            font-size: 18px;
            margin-bottom: 20px;
        }
        .btn{
            width: 100%;
            position: absolute;
            bottom: 10px;
            >button{
                width: 200px;
                height: 40px;
                border: none;
                background: #00C0ED;
                color: white;  
                display: block;
                margin: 0 auto;
            }
        }
    }
}
.el-col {
        border-radius: 4px;
}
.loginWrap{
    height: 100%;
    position: relative;
}
.bg-purple-dark {
    height: 100%;
}
.bg-purple {
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
}
.bg-purple-light {
    height: 100%;
}
.grid-content {
    border-radius: 4px;
}
</style>
