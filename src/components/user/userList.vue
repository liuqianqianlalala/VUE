<template>
  <div>
    <el-row class="countBox">
      <el-col :span="8">
        <p>总共用户数量</p>
        <p>{{coutData.all}}</p>
      </el-col>
      <el-col :span="8">
        <p>今日新增用户</p>
        <p>{{coutData.today}}</p>
      </el-col>
      <el-col :span="8">
        <p>本周新增用户</p>
        <p>{{coutData.thisWeek}}</p>
      </el-col>
    </el-row>

    <!--内容-->
    <div class="container">
      <h3 class="title">用户列表</h3>
      <div>
        <el-row class="flexCenter">
          <el-col :span="2">
            <span>性别筛选</span>
          </el-col>
          <el-col :span="2">
            <el-select v-model="sex" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <span>用户搜索：</span>
          </el-col>
          <el-col :span="4">
            <el-input v-model="serchName" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="2">
            <span>时间：</span>
          </el-col>
          <el-col :span="8">
            <el-date-picker
              style="width: 100%"
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="searchUserList">搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20" class="tableTitle">
        <el-col :span="2">
          <div>头像</div>
        </el-col>
        <el-col :span="4">
          <div>手机号</div>
        </el-col>
        <el-col :span="4">
          <div>昵称</div>
        </el-col>
        <el-col :span="4">
          <div>性别</div>
        </el-col>
        <el-col :span="4">
          <div>常住地</div>
        </el-col>
        <el-col :span="4">
          <div>注册时间</div>
        </el-col>
        <el-col :span="2">
          <div>状态</div>
        </el-col>
      </el-row>
      <el-row v-for="(item,index) in mainList" :key="index" class="rowBox">
        <el-col :span="2">
          <div>
            <div class="headPic hoverBoxShadow" @click="clickUserDetail(item.userId)"><img :src="item.userHeadPic" alt=""> </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div><span>{{item.telephone}}</span></div>
        </el-col>
        <el-col :span="4">
          <div><span>{{item.userName}}</span></div>
        </el-col>
        <el-col :span="4">
          <div><span>{{item.sex==1?'男':'女'}}</span></div>
        </el-col>
        <el-col :span="4">
          <div><span>{{item.city}}</span></div>
        </el-col>
        <el-col :span="4">
          <div><span>{{timeFormat(item.createTime)}}</span></div>
        </el-col>
        <el-col :span="2">
          <div><a :class="{red:item.status==1,blue:item.status==2}" style="cursor: pointer;" @click="changeStatus(item)">{{item.status==1?'下线':'上线'}}</a></div>
        </el-col>
      </el-row>
      <el-pagination
        @size-change="handleSizeChange"
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,50,100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import {getUserList,countUser,updateUser} from '@/common/js/api.js';
  import {timeFormat} from '@/common/js/common.js'
  export default {
    name:'userList',
    data(){
      return{
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        },
        ],
        sex: '',
        serchName: '',
        date: [],
        currentPage:1,
        pageSize:10,
        mainList:[],
        pageTotal:0,
        coutData:{},

      }
    },
    methods:{
      timeFormat,
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
        this.getUserList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUserList();
      },
      searchUserList(){
        this.getUserList();
      },
      getUserList(){
        let currentPage = this.currentPage;
        let pageSize = this.pageSize;
        let sex = this.sex || '';
        let serchName = this.serchName || '';
        let startTime;
        let endTime;
        if(this.date){
           startTime = this.date[0] || '';
           endTime = this.date[1] || '';
        }
        getUserList({currentPage, pageSize, sex, serchName, startTime, endTime}).then(res => {
          if(res && res.resultTrue){
            this.mainList = res.resultMsg.userInfos;
            this.pageTotal = res.resultMsg.dataCount;
          }
        })
      },
      //获取用户(新增)数量
      countUser(){
        countUser().then(res => {
          console.log(res);
          if(res && res.resultTrue){
            this.coutData = res.resultMsg;
          }
        })
      },
      changeStatus(val){
        const userId = val.userId;
        const status = val.status == 1?2:1;
        updateUser({userId, status}).then(res => {
          console.log(res);
          if(res && res.resultTrue){
            this.$message({
              message: status === 2 ? '激活成功' : '禁用成功',
              type: 'success',
              center: true
            });
           this.getUserList();
          }else{
            this.$message({
              message: '操作失败，请稍后再试',
              type: 'error',
              center: true
            })
          }
        })
      },
      clickUserDetail(userId){
        this.$emit('handleProps',0,{msg:{userId}});
        this.$router.push({path:'/index/user/detail'})
      },
    },
    created(){
      this.$emit('handleProps',0);
      this.getUserList();
      this.countUser();
    },
  }
</script>
