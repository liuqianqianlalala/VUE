import axios from 'axios'
import { Message, Loading } from 'element-ui';
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://app.wemew.com';
// axios.defaults.baseURL = 'http://app.test.wemew.com';
// axios.defaults.baseURL = 'http://192.168.11.115:9527';
// axios.defaults.baseURL = 'http://192.168.5.155:8079';

//同时发送多次请求处理
let needLoadingRequestCount = 0
function tryShowFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return

  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
//loading初始化与关闭
let loading = ''
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '欠可爱为您加载...',
    background: 'rgba(0, 0, 0, 0.7)',
    spinner:'el-icon-loading'
  })
}
function endLoading() {
  loading.close()
}


// axios请求拦截器
axios.interceptors.request.use((config) => {
  tryShowFullScreenLoading()
  return config
}, (error) => {
  return Promise.reject(error)
})
// axios响应拦截器
axios.interceptors.response.use(function (response) {
  tryHideFullScreenLoading()
  return response.data;
}, function (err) {
  tryHideFullScreenLoading()
  if (err) {
    if(!!err.response){
      switch (err.response.status) {
        case 400: Message({message: '请求错误(400)',type: 'error',center: true}); break;
        case 401: Message({message: '未授权，请重新登录(401)',type: 'error',center: true}); break;
        case 403: Message({message: '拒绝访问(403)',type: 'error',center: true}); break;
        case 404: Message({message: '请求出错(404)',type: 'error',center: true}); break;
        case 408: Message({message: '请求超时(408)',type: 'error',center: true}); break;
        case 500: Message({message: '服务器错误(500)',type: 'error',center: true}); break;
        case 501: Message({message: '服务未实现(501)',type: 'error',center: true}); break;
        case 502: Message({message: '网络错误(502)',type: 'error',center: true}); break;
        case 503: Message({message: '服务不可用(503)',type: 'error',center: true}); break;
        case 504: Message({message: '网络超时(504)',type: 'error',center: true}); break;
        case 505: Message({message: 'HTTP版本不受支持(505)',type: 'error',center: true}); break;
        default: Message({message: `连接出错(${err.response.status})!`,type: 'error',center: true});
      }
    }else{
      Message({message: '接口无返回值',type: 'error',center: true});
    }
  }else{
    Message({message: '连接服务器失败!',type: 'error',center: true});
  }
  return Promise.reject(err);
});

//get
function api(url,data) {
  let config = {headers:{'Content-Type':'appliction/x-www-form-urlencoded'}};
  return axios.get(url,{params:data},config)
}
//post JSON
function apiByPostJson(url,data) {
  let config = {headers:{'Content-Type':'application/json;charset=UTF-8'}};
  return axios.post(url,data,config)
}
//post QueryString
function apiByPostQueryString(url,data) {
  let params = new URLSearchParams()
  Object.keys(data).forEach(key => {
    params.append(key, data[key])
  })
  return axios.post(url,params)
}


//登录
export function login(data){
  return api("/pcUserInfo/login",data)
}

/*用户管理模块  --------------------------------------------------------------------------*/
//获取分类用户数量
export function countUserByType(data){
  return api(  "/pcUserInfo/countUserByType",data)
}
//获取用户(新增)数量
export function countUser(data){
  return api(  "/pcUserInfo/countUser",data)
}
//设置用户类型
export function serchUser(data){
  return api(  "/pcUserInfo/serchUser",data)
}
//获取用户列表
export function getUserList(data){
  return api(  "/pcUserInfo/getUserList",data)
}
//用户状态启用&停用
export function updateUser(data){
  return api(  "/pcUserInfo/update",data)
}
//获取用户详情
export function getUserInfoDetails(data){
  return api(  "/pcUserInfo/getUserInfoDetails",data)
}
//获取用户动态列表
export function getUserDynamicList(data){
  return api(  "/pcUserInfo/getUserDynamicList",data)
}
//分组管理设置用户类型
export function setUserType(data){
  return api(  "/pcUserInfo/setUserType",data)
}



/*红人管理模块  --------------------------------------------------------------------------*/
//获取红人列表
export function getRedUserList(data){
  return api(  "/pcUserInfo/getRedUserList",data)
}
//添加红人
export function setRed(data){
  return api(  "/pcUserInfo/setRed",data)
}
//删除红人
export function deleteRed(data){
  return api(  "/pcUserInfo/deleteRed",data)
}
//设置红人排序order
export function setRedOrder(data){
  return api(  "/pcUserInfo/setRedOrder",data)
}
//设置红人介绍
export function setRedIntruduce(data){
  return api(  "/pcUserInfo/setRedIntruduce",data)
}


/*搜索推荐用户  --------------------------------------------------------------------------*/
//获取搜索推荐用户列表
export function getSerchUser(data){
  return api(  "/pcUserInfo/getSerchUser",data)
}
//添加搜索推荐用户
export function addSerchUser(data){
  return api(  "/pcUserInfo/addSerchUser",data)
}
//删除搜索推荐用户
export function deleteSerchUser(data){
  return api(  "/pcUserInfo/deleteSerchUser",data)
}
//设置搜索推荐用户排序order
export function setSerchUserOrder(data){
  return api(  "/pcUserInfo/setSerchUserOrder",data)
}

/*动态管理  --------------------------------------------------------------------------*/
//获取动态数量
export function countDynamic(data){
  return api(  "/pcDynamic/countDynamic")
}
//获取动态分类
export function getDynamicType(data){
  return api(  "/pcDynamic/getType")
}
//获取动态列表
export function countDynamicList(data){
  return api(  "/pcDynamic/countDynamicList",data)
}
//获取动态详情
export function getDynamicDetails(data){
  return api(  "/pcDynamic/getDynamicDetails",data)
}
//设置动态分类
export function setDynamicStyle(data){
  return api(  "/pcDynamic/setDynamicStyle",data)
}
//设置动态热门
export function setDynamicHot(data){
  return api(  "/pcDynamic/setDynamicHot",data)
}
//删除动态
export function deleteDynamic(data){
  return api(  "/pcDynamic/deleteByDynamicId",data)
}

//获取热门动态列表
export function countDynamicOrder(data){
  return api(  "/pcDynamic/countDynamicOrder",data)
}
//设置热门排序
export function setDynamicOrder(data){
  return api(  "/pcDynamic/setDynamicOrder",data)
}

/*评论管理  --------------------------------------------------------------------------*/
//获取评论数
export function countDynamicComment(data){
  return api(  "/pcDynamicComment/countDynamicComment",data)
}
//获取评论列表
export function getDynamicCommentList(data){
  return api(  "/pcDynamicComment/getDynamicCommentList",data)
}
//删除评论
export function deleteById(data){
  return api(  "/pcDynamicComment/deleteById",data)
}

/*系统通知管理  --------------------------------------------------------------------------*/
//获取通知列表
export function getSysNoticetList(data){
  return api(  "/pcUserInfo/getSysNoticetList",data)
}
//删除通知
export function deleteSysNotice(data){
  return api(  "/pcUserInfo/deleteSysNotice",data)
}
//发布通知
export function publishSysNotice(data){
  return api(  "/pcUserInfo/publishSysNotice",data)
}

/*话题管理  --------------------------------------------------------------------------*/
//获取话题列表
export function getThemeList(data){
  return api(  "/pcTbPublishTheme/getThemeList",data)
}
//创建话题
export function createTheme(data){
  return api(  "/pcTbPublishTheme/createTheme",data)
}
//删除话题
export function deleteTheme(data){
  return api(  "/pcTbPublishTheme/deleteTheme",data)
}
//话题排序值更新
export function updateTheme(data){
  return api(  "/pcTbPublishTheme/setSerchThemeOrder",{type:2,...data})
}
//获取话题详情
export function getThemeDetail(data){
  return api(  "/pcTbPublishTheme/getTheme",data)
}
//话题动态分页
export function getThemeDynamicList(data){
  return api(  "/pcTbPublishTheme/getThemeDynamicList",data)
}
//获取搜索推荐话题
export function getSerchThemeList(data){
  return api(  "/pcTbPublishTheme/getSerchThemeList",data)
}
//添加搜索推荐话题
export function addSerchTheme(data){
  return api(  "/pcTbPublishTheme/addSerchTheme",data)
}
//设置搜索推荐话题排序order
export function setSerchThemeOrder(data){
  return api(  "/pcTbPublishTheme/setSerchThemeOrder",{type:1,...data})
}

/*（字典）  --------------------------------------------------------------------------*/
/*获取酒吧基础类型  （字典）*/
export function getDynamicBaiscType(data){
  return api(  "/pcBarBasic/getBarList",data)
}
/*获取用户分组类型  （字典）*/
export function getUserType(data){
  return api(  "/pcDictBase/getMy",data)
}





/* 酒吧管理  --------------------------------------------------------------------------*/
//获取酒吧列表
export function getBarList(data){
  return api(  "/pcBarBasic/getBarList",data)
}
//添加酒吧
export function createBar(data){
  return apiByPostQueryString("/pcBarBasic/addBar",data)
}
//获取酒吧详情
export function getBardetail(data){
  return api(  "/pcBarBasic/findDetails",data)
}
//酒吧启用关闭
export function setBarStatus(data){
  return api(  "/pcBarBasic/update",data)
}
//设置酒吧类型
export function setBarType(data){
  return api(  "/pcBarBasic/setType",data)
}
//修改酒吧信息
export function updateBarInfo(data){
  return apiByPostQueryString("/pcBarBasic/updateBarInfo",data)
}

/* 城市管理  --------------------------------------------------------------------------*/
//获取城市列表
export function getCityList(data){
  return api(  "/pcCity/getCityList",data)
}
export function getAddCityList(data){
  return api(  "/pcCity/getCityByName",data)
}

/* 约酒管理 --------------------------------------------------------------------------*/
//获取/查找约酒列表
export function getPostWineList(data){
  return api(  "/pcPostWine/getPostWineList",data)
}
//关闭约酒
export function updatePostWine(data){
  return api(  "/pcPostWine/updatePostWine",data)
}
//获取约酒详情
export function getPostWineDetails(data){
  return api(  "/pcPostWine/getDetails",data)
}
//获取约酒详情-搭讪列表
export function getAccostedList(data){
  return apiByPostJson(  "/pcsys/accostedList",data)
}



/* 消费管理  --------------------------------------------------------------------------*/
//设置mb
export function setMb(data){
  return apiByPostJson(  "/pcsys/setMb",data)
}
//获取mb信息
export function getMb(data){
  return api(  "/pcsys/getMb",data)
}
//修改mb信息
export function upMb(data){
  return apiByPostJson(  "/pcsys/upMb",data)
}
/**/
//设置商品信息
export function saveGoods(data){
  return apiByPostJson("/pcGoods/saveGoods",data)
}
//获取商品列表
export function getGiftList(data){
  return api( "/pcGoods/findGoodsByNormalGoods",data)
}
//获取商品信息
export function getOneGift(data){
  return api( "/pcGoods/findGoodsByGoodsId",data)
}
//修改商品信息
export function updateGoods(data){
  return apiByPostJson("/pcGoods/updateGoods",data)
}
//删除商品
export function deleGoods(data){
  return api( "/pcGoods/deleGoods",data)
}
//设置商品排序
export function updateGoodsSort(data){
  return api( "/pcGoods/updateSort",data)
}

//获取充值统计
export function getall(data){
  return api( "/pcsys/getall",data)
}
//获取充值列表
export function getFlowing(data){
  return apiByPostJson( "/pcsys/getFlowing",data)
}

/*
本地测试接口
export function saveGoods(data){
  return apiByPostJson("/czw/saveGoods",data)
}
export function getGiftList(data){
  return api( "/czw/findGoodsByNormalGoods",data)
}
export function getOneGift(data){
  return api( "/czw/findGoodsByGoodsId",data)
}
export function updateGoods(data){
  return apiByPostJson("/czw/updateGoods",data)
}
export function deleGoods(data){
  return api( "/czw/deleGoods",data)
}
export function updateGoodsSort(data){
  return api( "/czw/updateSort",data)
}
*/

/*上传文件  --------------------------------------------------------------------------*/
//获取签名
export function getUploadSign(data){
  return api(  "/pcUpload/getSign",data)
}
//文件上传
export function upload(url, data){
  let config = {headers:{'Content-Type':'multipart/form-data'}};
  return axios.post(url,data,config)
}
