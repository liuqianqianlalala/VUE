<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template  v-for="(item,index) in breadArr">
        <el-breadcrumb-item :to="{path:item.url}" :key="index" v-if="index<=pageNum">{{item.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <router-view @handleProps='gethandleProps' :props='props'></router-view>
  </div>
</template>
<script>
  export default{
    name:'user',
    data(){
      return{
        breadArr: [{
          name: '用户列表',
          url: '/index/user/list'
        },{
          name: '用户详情',
          url: '/index/user/detail'
        },{
          name: '动态详情',
          url: '/index/user/activing'
        }],
        pageNum:0,
        props:{},

      }
    },
    methods:{
      gethandleProps(pageNum,data){
        this.pageNum = pageNum;
        if(data){
          this.props = data.msg || {};
        }
      },
    },
  }
</script>
