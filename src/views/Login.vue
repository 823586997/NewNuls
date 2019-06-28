<template>
  <div class="login">
    <el-row class="loginWrap">
      <el-col
        :xs="19"
        :sm="20"
        :md="20"
        :lg="8"
        :xl="5"
        class="grid-content bg-purple"
      >
        <div class="login-cen">
          <form>
            <div class="input">
              <div class="hint">账号：</div>
              <el-input
                v-model="userName"
                placeholder="请输入您的账户或节点地址"
              ></el-input>
            </div>
            <div class="input">
              <div class="hint">密码：</div>
              <el-input
                v-model="passWord"
                show-password
                type="password"
                placeholder="请输入您的密码"
              ></el-input>
            </div>
            <div class="btn">
              <button @click="Login($event)">登录</button>
            </div>
          </form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      userName: "",
      passWord: ""
    };
  },
  methods: {
    Login(e) {
      let that = this;
      if (this.userName != "" && this.passWord != "") {
        e.preventDefault();
        let formData = new FormData();
        formData.append("usernameOragentAddress", this.userName);
        formData.append("password", this.passWord);

        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        
        axios.post("http://nuls.yqkkn.com:9898/passport/login", formData, config).then(function(res) {
          let data = res.data;
          if (data.code == 0) {
            localStorage.id = data.result.id;
            console.log(data.result);
            that.$store.commit('getNodeId',data.result.nodeId);
            that.$store.commit('getRole',data.result.role);
            if (data.result.username == null) {
              that.$router.push("/userName");
            } else {
              that.$router.push("/");
              that.$message("登录成功");
            }
          } else {
            that.$message(data.msg);
          }
        });
      } else {
        that.$message("请输入您的账号密码");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: #f9fafd;
  .login-cen {
    width: 100%;
    height: 250px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    background: #f9fafd;
    padding: 10px;
    .input {
      display: flex;
      margin: 20px 0;
      .hint {
        width: 70px;
        line-height: 40px;
        text-align: right;
      }
    }
    .btn {
      width: 100%;
      position: absolute;
      bottom: 10px;
      > button {
        width: 200px;
        height: 40px;
        border: none;
        background: #00c0ed;
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
.loginWrap {
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
