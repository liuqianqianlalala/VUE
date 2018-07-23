<template>
  <div>
    <div class="container">
      <h3 class="title">用户详情</h3>
      <div class="flex">
        <div class="card8 card"><p>昵称</p> <p>{{detailMsg.userName}}</p></div>
        <div class="card8 card"><p>ID</p> <p>{{detailMsg.userId}}</p></div>
        <div class="card8 card"><p>手机号</p> <p>{{detailMsg.telephone}}</p></div>
        <div class="card8 card"><p>性别</p> <p>{{detailMsg.sex==1?'男':'女'}}</p></div>
        <div class="card8 card"><p>生日</p> <p>{{timeFormat(detailMsg.birthday).substring(0,10)}}</p></div>
        <div class="card8 card"><p>年龄</p> <p>{{detailMsg.age}}</p></div>
        <div class="card8 card"><p>粉丝</p> <p>{{detailMsg.followerNum}}</p></div>
        <div class="card8 card"><p>关注</p> <p>{{detailMsg.likeNum}}</p></div>
        <!--<div class="card8 card"><p>用户类型</p> <p>{{!options[detailMsg.userType]?'无此类型':options[detailMsg.userType].cName}}</p></div>-->
        <div class="card8 card"><p>动态数</p> <p>{{detailMsg.dynamicNum}}</p></div>
        <div class="card8 card"><p>注册时间</p> <p>{{timeFormat(detailMsg.createTime).substring(0,10)}}</p></div>
        <div class="card8 card"><p>地点</p> <p>{{(detailMsg.province||'')+(detailMsg.city||'')}}</p></div>
        <div class="card8 card"><p>用户状态</p> <p>{{detailMsg.status==1?'下线':'上线'}}</p></div>
        <div class="card8 card"><p>喵币</p> <p>{{detailMsg.appWemewB||'无'}}</p></div>
        <div class="card8 card"><p>礼物收益余额</p> <p>{{detailMsg.userCash||'无'}}</p></div>
        <div class="card1 card"><p>签名</p> <p>{{detailMsg.introduce}}</p></div>
      </div>
      <h3 class="title" >用户头像</h3>
      <div class="flex">
        <div class="picBox">
          <img :src="detailMsg.userHeadPic" >
        </div>
      </div>
      <h3 class="title">用户背景墙</h3>
      <div class="flex">
        <div class="picBox">
          <img :src="detailMsg.backGroundImage" >
        </div>
      </div>
      <h3 class="title">用户动态</h3>
      <div class="flex">
        <div v-for="(item,index) in OtherList" :key="index" class="boxItem">
          <div class="picBox hoverBoxShadow"  @click='handelRouter(item.dId)'>
            <img  :src="item.dCoverUrl" >
            <i v-if="item.dType === 1" class="el-icon-caret-right videoIcon"></i>
          </div>
          <p>{{timeFormat(item.createTime)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUserInfoDetails,getUserDynamicList} from '@/common/js/api.js';
  import {timeFormat} from '@/common/js/common.js';
  export default {
    name:'userDetail',
    data(){
      return{
        userId:'',
        detailMsg:{},
        OtherList: [],
        pageTotal:0,
        currentPage: 1,
        pageSize: 10,
      }
    },
    props:['props'],
    methods:{
      timeFormat,
      getUserDetail(){
        const userId = this.userId
        getUserInfoDetails({userId}).then(res => {
          if(res && res.resultTrue){
            this.detailMsg = res.resultMsg
          }
        })
      },
      //获取动态列表
      getDynamicList(){
        const userId = this.userId;
        let pageSize = this.pageSize;
        let currentPage = this.currentPage;
        getUserDynamicList({currentPage,pageSize,userId}).then(res => {
          if(res && res.resultTrue){
            this.OtherList = res.resultMsg.userInfos;
            this.pageTotal = res.resultMsg.pageCount
          }
        })
      },
      handelRouter(dId){
        let userId = this.userId;
        this.$emit('handleProps',0,{msg:{userId,dId}});
        this.$router.push({path:'/index/user/activing'})
      },
    },
    created(){
      this.$emit('handleProps',1);
      console.log(this.props);
      this.userId = this.props.userId;
      this.getUserDetail();
      this.getDynamicList();
    },
  }
</script>
