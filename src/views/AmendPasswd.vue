<template>
   <div class="login">

        <el-row class="loginWrap">
            <el-col :xs="19" :sm="20" :md="20" :lg="8" :xl="5" class="grid-content bg-purple">
                <div class='login-cen'>
                    <form>
                        <div class='input'>
                            <div class='hint'>旧密码：</div>
                            <el-input v-model="oldPassword" placeholder="请输入您的旧密码"></el-input>
                        </div>
                        <div class='input'>
                            <div class='hint'>新密码：</div>
                            <el-input v-model='newPassword' show-password type='password' placeholder="请输入您要更改的密码"></el-input>
                        </div>
                        <div class='input'>
                            <div class='hint'>确认密码：</div>
                            <el-input v-model='newPasswords' show-password type='password' placeholder="请确认您的密码"></el-input>
                        </div>
                        <div class='btn'>
                            <button @click='Amend($event)'>确认修改</button>
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
            oldPassword:'',
            newPassword:'',
            newPasswords:''
        }
    },
    methods:{
        Amend(e){
            let that = this;
            if( this.oldPassWord != '' && this.newPassword != '' && this.newPasswords != ''){
                e.preventDefault();
                let formData = new FormData();
                formData.append('oldPassword', this.oldPassword);
                formData.append('newPassword', this.newPassword);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                axios.post('http://nuls.yqkkn.com:9898/admin/changePassword', formData, config)
                .then(function (res) {
                    let data = res.data;
                    if( data.code == 0 ){
                        that.$message('修改成功');
                        that.$router.push('/');
                    }else{
                        that.$message(data.msg);
                    }
                })
            }else{
                that.$message('请输入您要修改的密码');
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
        .input{
            display: flex;
            margin: 20px 0;
            .hint{
                width: 120px;
                line-height: 40px;
                text-align: right;
            }
        }
        .btn{
            width: 100%;
            position: absolute;
            bottom: -30px;
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