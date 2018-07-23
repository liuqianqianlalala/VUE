<template>
  <div class="formBox">
    <h2>欠可爱的学习项目</h2>
    <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"  ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')" style="width: 200px;">登 陆</el-button>
    </el-form>
  </div>
</template>

<script>
  import {login} from '@/common/js/api.js'
  export default {
    name: 'Login',
    data() {
      return {
        ruleForm: {
          name: '',
          password: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2,  message: '长度必须大于2个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请选择输入密码...', trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      submitForm(formName) {
        let userMsg = {
          userName:this.ruleForm.name,
          userPassword:this.ruleForm.password,
        };
        this.$refs[formName].validate((valid) => {
          if (valid) {
            login(userMsg).then(res=>{
              console.log(res);
              if(!res.resultTrue){
                this.$message({message:'用户名或密码错误',center: true,type:'error'});
                return;
              }
              sessionStorage.setItem('activeIndex','1-1');
              localStorage.setItem('userMsg',JSON.stringify(res.resultMsg.userName));
              this.$router.push({ path: '/index/user/list'});
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
    }
  }
</script>
<style>
  .formBox{
    width: 500px;
    margin: 0 auto;
  }

</style>
