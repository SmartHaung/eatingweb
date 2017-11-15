<template>
  <section>
    <el-row style="
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;">
      <el-col :span="24" style="height: 60px;
  line-height: 60px;
  background: #20a0ff;
  color: #fff;">
        <el-col :span="10"   style="width: 230px;
  height: 60px;
  font-size: 22px;
  padding-left: 20px;
  padding-right: 20px;
  border-color: rgba(238, 241, 146, 0.3);
  border-right-width: 1px;
  border-right-style: solid;
  width: 230px;">
       吃饭啦后台管理
        </el-col>
        <el-col :span="4" style="
  text-align: right;
  padding-right: 35px;
  float: right;">
          <span style="
  cursor: pointer;
  color: #fff;">
            <el-button size="mini" type="success" @click="backToMyBusiness">返回商家列表</el-button>
            <el-button size="mini" type="warning" @click="logout">退出登录</el-button>
            <img v-bind:src="url" style="width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
  float: right;" />
          </span>
        </el-col>
      </el-col>
      <el-col>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="订单号">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.callqueueOrderid }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="updateCallQueue(scope.row.callqueueId,2)">部分完成</el-button>
              <el-button size="mini" type="warning" @click="updateCallQueue(scope.row.callqueueId,3)">全部完成</el-button>
              <el-button size="mini" type="success" @click="updateCallQueue(scope.row.callqueueId,4)">取消</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { getLocalStorage } from "../api/api";
export default {
  data() {
    return {
      tableData: [],
      user: null,
      url: "/static/img/trademark.jpg"
    };
  },
  methods: {
    updateCallQueue(callqueueId, type) {
      this.$http
        .jsonp(
          "https://huangwenbin.xin/callqueue/handleFromWeb?callqueueHandlelogCallqueueid=" +
            callqueueId +
            "&callqueueHandlelogCreateuserUnionid=" +
            this.user.unionId +
            "&callQueueStatus=" +
            type +
            "&type=1"
        )
        .then(res => {
          if (res && res.data && res.data.code && res.data.code == 1) {
            this.$message.info("操作成功");
            this.queryCallQueue();
          } else {
            this.$message.error("操作失败");
          }
        });
    },
    queryCallQueue() {
      if (
        this.$route &&
        this.$route.params &&
        this.$route.params.businessInfoId
      ) {
        var user = getLocalStorage("eating-user");
        if (!user) {
          this.$router.push("/");
        } else {
          this.user = user;
          this.url = user.userInfo.avatarUrl;
          this.$http
            .jsonp(
              "https://huangwenbin.xin/callqueue/queryCallQueueListForWeb?callqueueBusinessId=" +
                this.$route.params.businessInfoId +
                "&businessUniqueId=" +
                this.$route.params.businessInfoUniqueId
            )
            .then(res => {
              if (res && res.data && res.data.code && res.data.code == 1) {
                if (res.data.data && res.data.data.callQueueList) {
                  this.tableData = res.data.data.callQueueList;
                }
              } else {
                this.tableData = [];
              }
            });
        }
      }
    },
    logout() {
      this.$confirm("确认退出吗?", "提示", {}).then(() => {
        localStorage.removeItem("eating-user");
        this.$router.push("/");
      });
    },
    backToMyBusiness() {
      this.$router.push("/mybusiness");
    }
  },
  mounted() {
    this.queryCallQueue();
    window.this = this;
    window.callqueueTimer = setInterval(function() {
      window.this.queryCallQueue();
    }, 10000);
  },
  destroyed: function() {
    clearInterval(window.callqueueTimer);
  }
};
</script>
