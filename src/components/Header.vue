<template>
  <div class="header">
    <div class="logo">
      <img src="../static/images/logo.png" alt="" />
    </div>
    <div class="nav">
      <span @click="nav()"></span>
      <transition name="fade">
        <ul v-if="flag">
          <li @click="Home()">首页</li>
          <li @click="login()">{{ nodeId ? "退出" : "登录" }}</li>
          <li @click="user()" >账户管理</li>
          <li v-if="role == 'user'" @click="nodeInfo()">节点管理</li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "",
  data() {
    return {
      flag: false,
      nodeId: this.$store.state.nodeId,
      role: localStorage.role ? localStorage.roole : ''
    };
  },
  mounted(){
    window.addEventListener('unload',this.setNodeId);
  },
  methods: {
    nav() {
      this.flag = !this.flag;
    },
    Home() {
      this.$router.push("/");
      this.flag = !this.flag;
    },
    login() {// 登录退出
      if (this.nodeId) {
        
        let url = "http://nuls.yqkkn.com:9898/passport/logout";
        axios.get(url).then(res => {
          localStorage.clear();
          location.reload();
          this.$message("您已成功退出登录");
        });
      } else {
        this.$router.push("/login");
      }
      this.flag = !this.flag;
    },
    nodeInfo() { // 节点管理
      this.$router.push({ path: "/details", query: { id: this.nodeId } });
      this.flag = !this.flag;
    },
    // 账户管理
    user() {
      if (this.nodeId) {
        this.$router.push({ path: "/amendPasswd" });
        this.flag = !this.flag;
      } else {
        this.$message("请先登录在进行账户管理操作");
      }
    },
    setNodeId(){
      localStorage.nodeId = this.nodeId;
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 59px;
  background: white;
  position: fixed;
  top: 0;
  display: flex;
  border-bottom: 1px solid #ddd;
  z-index: 10;
  .logo {
    flex: 1;
    display: flex;
    align-items: center;
    > img {
      margin-left: 10px;
      width: 100px;
      height: 40px;
      align-items: center;
    }
  }
  .nav {
    position: relative;
    width: 80px;
    text-align: center;
    line-height: 70px;
    > span {
      width: 25px;
      height: 25px;
      display: inline-block;
      background: url("../static/images/nav.png") no-repeat center;
      background-size: 25px;
    }
    > ul {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      z-index: 20;
      > li {
        text-align: center;
        line-height: 30px;
        background: white;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
