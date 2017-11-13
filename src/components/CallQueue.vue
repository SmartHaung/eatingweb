<template>
  <section>
    <el-row class="container">
      <el-col :span="24" class="header">
        <el-col :span="10" class="logo" :class="logo-width">
          吃饭啦后台管理
        </el-col>
        <el-col :span="4" class="userinfo">
          <span class="userinfo-inner">
            <el-button size="mini" type="warning" @click="logout">退出登录</el-button>
            <img src="/static/img/trademark.jpg" />
          </span>
        </el-col>
      </el-col>
      <el-col>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="订单号" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.callqueueId }}</span>
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
      tableData: [{ callqueueId: 1 }, { callqueueId: 2 }, { callqueueId: 3 }]
    };
  },
  methods: {
    updateCallQueue(callqueueId, type) {},
    queryCallQueue() {
      var user = getLocalStorage("eating-user");
      if (!user) {
        this.$router.push("/");
      } else {
      }
    },
    logout() {
      this.$confirm("确认退出吗?", "提示", {}).then(() => {
        localStorage.removeItem("eating-user");
      });
    }
  },
  mounted() {
    this.queryCallQueue();
    window.this = this;
    setInterval(function() {
      window.this.queryCallQueue();
    }, 10000);
  }
};
</script>

<style scoped>
.header {
  height: 60px;
  line-height: 60px;
  background: #20a0ff;
  color: #fff;
}

.userinfo {
  text-align: right;
  padding-right: 35px;
  float: right;
}

.userinfo-inner {
  cursor: pointer;
  color: #fff;
}

img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
  float: right;
}

.logo {
  width: 230px;
  height: 60px;
  font-size: 22px;
  padding-left: 20px;
  padding-right: 20px;
  border-color: rgba(238, 241, 146, 0.3);
  border-right-width: 1px;
  border-right-style: solid;
}

.txt {
  color: #fff;
}

.logo-width {
  width: 230px;
}

.logo-collapse-width {
  width: 60px;
}

.tools {
  padding: 0px 23px;
  width: 14px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
</style>
