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
        <el-col :span="10"  style="
  width: 230px;
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
        <el-col :span="4" style="text-align: right;
  padding-right: 35px;
  float: right;">
          <span style="cursor: pointer;
  color: #fff;">
            <el-button size="mini" type="warning" @click="logout">退出登录</el-button>
            <img v-bind:src="url" style="
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
  float: right;" />
          </span>
        </el-col>
      </el-col>
      <el-col>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="店铺名称">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.businessInfoName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="callQueue(scope.row.businessInfoId,scope.row.businessInfoUniqueId)">叫号</el-button>
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
    callQueue(businessInfoId, businessInfoUniqueId) {
      this.$router.push(
        "/callqueue/" + businessInfoId + "/" + businessInfoUniqueId
      );
    },
    queryMybusiness() {
      var user = getLocalStorage("eating-user");
      if (!user) {
        this.$router.push("/");
      } else {
        this.user = user;
        this.url = user.userInfo.avatarUrl;
        this.$http
          .jsonp(
            "https://huangwenbin.xin/business/listBusinessInfoForWeb?unionid=" +
              user.unionId
          )
          .then(res => {
            if (res && res.data && res.data.code && res.data.code == 1) {
              if (res.data.data && res.data.data.businessList) {
                this.tableData = res.data.data.businessList;
              }
            }
          });
      }
    },
    logout() {
      this.$confirm("确认退出吗?", "提示", {}).then(() => {
        localStorage.removeItem("eating-user");
        this.$router.push("/");
      });
    }
  },
  mounted() {
    this.queryMybusiness();
  }
};
</script>

