<template>
  <div class="details">
    <div class="nodeInfo_cen">
      <div class="nickname">
        <p>
          <span class="avatar">
            <img
              :src="
                data.avatar
                  ? data.avatar
                  : require('../static/images/default.jpg')
              "
              alt=""
            />
          </span>
        </p>
        <span>
          <i
            v-if="data.id == nodeId && data.checkstatus == '0'"
            class="buldGreen"
          ></i>
          <i
            v-if="data.id == nodeId && data.checkstatus == '2'"
            class="buldRed"
          ></i>
          <i
            v-if="data.id == nodeId && data.checkstatus == '1'"
            class="buldYellow"
          ></i>
          <i
            v-if="role == 'admin' && data.checkstatus == '1'"
            class="yes"
            @click="judgeYes()"
          ></i>
          <i
            v-if="role == 'admin' && data.checkstatus == '1'"
            class="no"
            @click="judgeNo()"
          ></i>
          <i
            v-if="role == 'admin' || data.id == nodeId"
            class="redact"
            @click="Change()"
          ></i>
        </span>
      </div>
      <div class="message">
        <div class="one">
          <div style="display: flex; align-items: center;">
            <span>创建地址</span>
            <p>{{ data.agentAddress }}</p>
            <!-- <em class='copy'></em> -->
          </div>
        </div>
        <div class="one">
          <div>
            <span>Hash</span>
            <p>{{ data.txHash }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>别名</span>
            <p>{{ data.agentAlias }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>打包地址</span>
            <p>{{ data.packingAddress }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>信用值</span>
            <p>{{ data.creditValue }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>奖励地址</span>
            <p>{{ data.rewardAddress }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>保证金</span>
            <p>{{ data.deposit }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>节点版本</span>
            <p>{{ data.version }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>佣金比例</span>
            <p>{{ data.commissionRate }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>创建者奖励</span>
            <p>{{ data.agentReward }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>参与人数</span>
            <p>{{ data.depositCount }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>委托者总奖励</span>
            <p>{{ data.totalReward }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>创建时间</span>
            <p>{{ data.createTime }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>总委托量</span>
            <p>{{ data.totalDeposit }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>相关链接</span>
            <p>{{ data.link }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>联系方式</span>
            <p>{{ data.phone }} / {{ data.email }}</p>
          </div>
        </div>
        <div class="one">
          <div>
            <span>描述</span>
            <p>{{ data.description }}</p>
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
      role: this.$store.state.role,
      nodeId: this.$store.state.nodeId
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    Change() {
      this.$router.push({ path: "/alterMsg", query: { id: this.data.id } });
    },
    getData() {
      let url = "http://nuls.yqkkn.com:9898/node/" + this.$route.query.id;
      axios.get(url).then(res => {
        // console.log(res);
        let data = res.data;
        this.data = data.result;
      });
    },
    judgeYes() {
      let url = "http://nuls.yqkkn.com:9898/admin/nodePass/"+this.data.id;
      axios
        .get(url)
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            this.$message("审核成功");
            this.getData();
          } else {
            this.$message(data.msg);
          }
        });
    },
    judgeNo() {
      let url = "http://nuls.yqkkn.com:9898/admin/nodeReject/"+this.data.id;
      axios
        .get(url)
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            this.$message("审核成功");
            this.getData();
          } else {
            this.$message(data.msg);
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.details {
  padding-bottom: 40px;
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
        background: url("../static/images/buldGreen.png") no-repeat center;
        background-size: 20px;
      }
      .buldYellow {
        background: url("../static/images/buldYellow.png") no-repeat center;
        background-size: 20px;
      }
      .yes {
        background: url("../static/images/yes.png") no-repeat center;
        background-size: 20px;
      }
      .no {
        background: url("../static/images/no.png") no-repeat center;
        background-size: 20px;
      }
      .buldRed {
        background: url("../static/images/buldRed.png") no-repeat center;
        background-size: 20px;
      }
      .redact {
        background: url("../static/images/redact.png") no-repeat center;
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
    padding: 0 10px;
    color: #8293b0;
    > div {
      width: 100%;
      line-height: 40px;
      display: flex;
      > div {
        width: 50%;
        display: flex;
        font-size: 12px;
        > span {
          width: 80px;
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
      .copy {
        position: absolute;
        right: 5px;
        align-items: center;
        width: 20px;
        height: 20px;
        background: url("../static/images/copy.png") no-repeat center;
        background-size: 20px;
      }
    }
  }
}
</style>
