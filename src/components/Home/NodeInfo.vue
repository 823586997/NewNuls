<template>
  <div class="nodeInfo">
    <div class='search'>
      <el-input
      placeholder="请输入您要搜索的内容"
      prefix-icon="el-icon-search"
      v-model="searchValue">
      </el-input>
    </div>
    <div class="nodeInfo_cen" v-for="(item, index) in data" :key="index">
      <div class="nickname">
        <p>
          <span class="avatar">
            <img
              :src="
                item.avatar
                  ? item.avatar
                  : require('../../static/images/default.jpg')
              "
              alt=""
            />
          </span>
        </p>
        <span>
          <i
            v-if="
              (role == 'admin' || nodeId == item.id) && item.checkstatus == '0'
            "
            class="buldGreen"
          ></i>
          <i
            v-if="
              (role == 'admin' || nodeId == item.id) && item.checkstatus == '2'
            "
            class="buldRed"
          ></i>
          <i
            v-if="
              (role == 'admin' || nodeId == item.id) && item.checkstatus == '1'
            "
            class="buldYellow"
          ></i>
          <i class="message" @click="Details(item.id)"></i>
          <i
            v-if="role == 'admin' || nodeId == item.id"
            class="redact"
            @click="Change(item.id)"
          ></i>
        </span>
      </div>
      <div class="message">
        <div>
          <div>
            <span>别名</span>
            <p>{{ item.agentAlias }}</p>
          </div>
          <div>
            <span>佣金比例</span>
            <p>{{ item.commissionRate }}</p>
          </div>
        </div>
        <div>
          <div>
            <span>保证金</span>
            <p>{{ item.deposit }}</p>
          </div>
          <div>
            <span>参与人数</span>
            <p>{{ item.depositCount }}</p>
          </div>
        </div>
        <div>
          <div>
            <span>委托量</span>
            <p>{{ item.totalDeposit }}</p>
          </div>
          <div>
            <span>信用值</span>
            <p>{{ item.creditValue }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>相关链接</span>
            <p>{{ item.link }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>联系方式</span>
            <p>{{ item.phone }} / {{ item.email }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>描述</span>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "",
  data() {
    return {
      data: [],
      role: localStorage.role ? localStorage.role : "",
      nodeId: this.$store.state.nodeId,
      searchValue: ''
    };
  },
  watch:{
    searchValue(New,Old){
      let that = this;
      if( New ){
        let formData = new FormData();
        formData.append("input", New);

        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        
        axios.post("http://nuls.yqkkn.com:9898/search", formData, config)
        .then(function(res) {
            let data = res.data;
            if( data.code == 0 ){
              that.data = data.result;
            }else{
              that.$message(data.msg);
            }
        });
      }else{
        this.getNodeInfo();
      }
    }
  },
  mounted() {
    this.getNodeInfo();
  },
  methods: {
    Details(id) {
      this.$router.push({ path: "/details", query: { id: id } });
    },
    Change(id) {
      this.$router.push({ path: "/alterMsg", query: { id: id } });
    },
    getNodeInfo() {
      let url = "http://nuls.yqkkn.com:9898/nodes/0";
      // let url = '/nodes/0'
      axios.get(url).then(res => {
        // console.log(res);
        let data = res.data;
        this.data = data.result;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.nodeInfo {
  width: 100%;
  padding: 0 10px;
  padding-bottom: 10px;
  .search{
    width: 100%;
    margin: 10px 0;
    background: yellow;
  }
  .nodeInfo_cen {
    width: 100%;
    background: white;
    margin-top: 10px;
    border: 1px solid #dde4f0;
    .nickname {
      width: 100%;
      line-height: 40px;
      display: flex;
      padding: 0 10px;
      background: #fafbfe;
      > p {
        flex: 1;
        color: #445571;
        .avatar {
          display: block;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin: 5px 0;
          > img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
      > span {
        display: flex;
        align-items: center;
        .buldGreen {
          background: url("../../static/images/buldGreen.png") no-repeat center;
          background-size: 20px;
        }
        .buldRed {
          background: url("../../static/images/buldRed.png") no-repeat center;
          background-size: 20px;
        }
        .buldYellow {
          background: url("../../static/images/buldYellow.png") no-repeat center;
          background-size: 20px;
        }
        .message {
          background: url("../../static/images/message.png") no-repeat center;
          background-size: 20px;
        }
        .redact {
          background: url("../../static/images/redact.png") no-repeat center;
          background-size: 20px;
        }
        > i {
          display: inline-block;
          align-items: center;
          width: 20px;
          height: 20px;
          margin-left: 10px;
        }
      }
    }
    .message {
      width: 100%;
      color: #8293b0;
      > div {
        width: 100%;
        line-height: 40px;
        display: flex;
        > div {
          width: 50%;
          display: flex;
          padding: 0 5px;
          > span {
            width: 70px;
          }
          > p {
            flex: 1;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .one {
        div {
          width: 100%;
        }
      }
    }
  }
}
</style>
