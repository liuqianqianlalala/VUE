<template>
  <div style="width: 100%;height: 100%">
    <el-container style="width: 100%;height: 100%; border: 1px solid #eee">
      <el-header style="text-align: right; font-size: 12px">
        <span>{{userMsg}}</span>
        <a @click="logOut">退出登陆</a>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: #031b33;">
          <el-menu :router="true">
             <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>用户管理</template>
              <el-menu-item-group>
                <template>
                  <el-menu-item index="1-1" :route="'/index/user/list'" :key="1">用户列表</el-menu-item>
                  <el-menu-item index="1-2" :route="'/index/user/group'" :key="2">分组管理</el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main style="background:#F0F2F5">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
  .el-header {
    background-color: #12375d;
    color: #fff;
    line-height: 60px;
    font-size: 18px;
  }
  .el-aside {
    color: #fff;
  }
  .el-menu {
    background: #071a2d;
    color: #fff;
  }
  .el-menu li,.el-submenu__title{
    color: #fff;
  }
  li:hover,.el-submenu__title:hover{
    color: #071a2d;
  }

</style>

<script>
  export default {
    name: 'Index',
    data() {
      return{
        userMsg:{

        },

      }

    },
    methods:{
      logOut(){
        console.log("退出登陆...");
        this.$router.push({ path: '/'});
      }
    },
    created(){
      let userInfo = localStorage.getItem('userMsg');
      console.log(userInfo);
      this.userMsg = JSON.parse(userInfo);
    },
  };
</script>
