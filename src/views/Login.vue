<template>
  <div class="access_login_container">
    <div class="bg">
      <div class="top">
        <img src="@/image/access/login_bg2_00000.png" alt="">
        <div class="logo">
          <!-- <img src="@/image/common/logo.png" alt=""> -->
          <h1>WMS SYSTEM</h1>
        </div>
      </div>
      <div class="footer">
        <p class="slogan">For A Better Digital Solution</p>
        <span class="copyright">Copyright @2020 SuZhou Zenziss loT Technology. Version 2.0.0</span>
      </div>
    </div>
    <div class="main">
      <div class="login_wrapper">

        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="loginform">
          <h3 class="title">Welcome To WMS SYSTEM</h3>
          <el-form-item prop="loginName">
            <el-input v-model="loginForm.loginName" type="text" auto-complete="off" placeholder="Username">
              <img class="icon" slot="prefix" src="@/image/access/username.png" alt />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="Password"
              @keyup.enter.native="handleLogin">
              <img class="icon" slot="prefix" src="@/image/access/username.png" alt />
            </el-input>
          </el-form-item>
          <el-form-item prop="imageCode" class="verificationcode">
            <el-input v-model="loginForm.imageCode" type="text" auto-complete="off" placeholder=""
              @keyup.enter.native="handleLogin">
            </el-input>
            <a class="codeimage" @click='getCode'>
              <img :src="verificationCodeData" alt="">
            </a>
          </el-form-item>

          <el-form-item class="operation">
            <el-button :loading="loading" size="medium" type="primary" @click.native.prevent="handleLogin">
              <span v-if="!loading">Login</span>
              <span v-else>Login...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>


    </div>

    <!--  底部  -->

  </div>
</template>

<script>
  import {
    getCodeImg
  } from "@/api/login";
  import Cookies from "js-cookie";
  import {
    encrypt,
    decrypt
  } from '@/utils/jsencrypt'

  export default {
    name: "Login",
    data() {
      return {
        getVerificationCodeRequest: '/api/getVerificationCode',
        codeUrl: "",
        cookiePassword: "",
        verificationCodeData: '',
        loginForm: {
          loginName: "admin",
          password: "1",
          imageCode: "",
          sessionUUID: ""
        },
        rememberMe: false,

        loginRules: {
          loginName: [{
            required: true,
            trigger: "blur",
            message: "用户名不能为空"
          }],
          password: [{
            required: true,
            trigger: "blur",
            message: "密码不能为空"
          }],
          imageCode: [{
            required: true,
            trigger: "change",
            message: "验证码不能为空"
          }]
        },
        loading: true,
        redirect: undefined
      };
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true
      }
    },
    created() {
      this.remResizing({
        baseline: 1366,
        fontSize: 20
      })
    },
    async mounted() {
      this.loading = true;
      const authFlag = localStorage.getItem("loginFlag");
      const backRoute = this.$store.state.app.backRoute
      if (authFlag && authFlag !== 'null') {
        this.$router.push('/dashboard')
        this.loading = false;
      } else {
        this.loading = false;
        this.getCode();
      }
      // this.checkUserInfo().then(response => {
      //   this.loading = true;
      //   this.$router.push('/dashboard')
      // }).catch(error => {
      //   this.getCode();
      // })
    },
    methods: {
      checkUserInfo() {
        return new Promise((resolve, reject) => {
          this.$store.dispatch('getUserInfo').then(response => {
            resolve(true)
          }).catch(error => {
            reject(error)
          })
        })
      },
      getCode() {
        this.$http.get(this.getVerificationCodeRequest).then(response => {

          response = response.data
          this.verificationCodeData = 'data:image/jpeg;base64,' + response.imageCode
          this.loginForm.sessionUUID = response.sessionUUID
        }).catch(error => {
          console.log(error)
        })
      },
      getCookie() {
        const username = Cookies.get("username");
        const password = Cookies.get("password");
        const rememberMe = Cookies.get('rememberMe')
        this.loginForm = {
          username: username === undefined ? this.loginForm.username : username,
          password: password === undefined ? this.loginForm.password : decrypt(password),
          rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
        };
      },
      handleLogin() {
        // 临时跳过登录
        this.$refs.loginForm.validate(async valid => {

          if (valid) {
            this.loading = true;
            // if (this.loginForm.rememberMe) {
            //   Cookies.set("username", this.loginForm.username, {
            //     expires: 30
            //   });
            //   Cookies.set("password", encrypt(this.loginForm.password), {
            //     expires: 30
            //   });
            //   Cookies.set('rememberMe', this.loginForm.rememberMe, {
            //     expires: 30
            //   });
            // } else {
            //   Cookies.remove("username");
            //   Cookies.remove("password");
            //   Cookies.remove('rememberMe');
            // }
            try {
              await this.$store.dispatch("Login", this.loginForm)
              // const userInfo = await this.$store.dispatch('getUserInfo')
              // this.$store.commit('user/setUserInfo', userInfo)
              localStorage.setItem("loginFlag", true);
              this.$router.push({
                path: this.redirect || "/dashboard"
              });
              this.$store.commit('setLogin', true)

              this.$message.success('登录成功')
              let htmlEl = document.getElementsByTagName('html')[0]
              htmlEl.style.fontSize = ''
              this.loading = false;
            } catch (error) {
              console.log(error)
              this.loading = false;
              this.$message.error(error.msg)

              this.getCode();
            }
          }
        });
      },
      remResizing(params) {
        let options = Object.assign({
          fontSize: 16,
          baseline: 320,
          threshold: 0,
          basedonnarrow: false,
          basedonwide: false,
          dropoff: false,
          aligncenter: true,
          inward: false
        }, params);
        const htmlEl = document.getElementsByTagName('html')[0];
        const bodyEl = document.getElementsByTagName('body')[0];


        const windowHeight = window.screen.availHeight
        const windowWidth = window.screen.availWidth
        let frontLine = windowWidth

        const sizeConstraint = function () {
          if (options.basedonnarrow) {
            orientationSensor({
              portrait: function () {
                frontLine = window.screen.availWidth;
              },
              landscape: function () {
                frontLine = window.screen.availHeight;
              }
            });
          } else {
            frontLine = window.screen.availWidth;
          }
          var factor = 0;
          if (options.baseline === 0) {
            factor = 1;
          } else if (frontLine <= options.baseline) {
            if (options.inward) {
              factor = frontLine / options.threshold;
            } else {
              factor = frontLine / options.baseline;
            }
          } else if (frontLine > options.baseline && frontLine <= options.threshold || options.threshold === 0) {
            if (options.threshold >= 0) {
              if (options.inward) {
                factor = frontLine / options.threshold;
              } else {
                factor = frontLine / options.baseline;
                // alert(factor)
              }
            }
            if (options.aligncenter) {
              // bodyEl.css({
              //   margin: 0,
              //   width: 'auto'
              // });
              bodyEl.style.margin = '0'
              bodyEl.style.width = 'auto'
            }
          } else if (frontLine > options.threshold) {
            // factor = frontLine / options.baseline;
            if (options.aligncenter) {
              factor = options.threshold / options.baseline;
              bodyEl.style.margin = '0 auto'
              bodyEl.style.width = options.threshold
              // bodyEl.css({
              //   margin: '0 auto',
              //   width: options.threshold
              // });
            } else {
              factor = frontLine / options.baseline;
              bodyEl.style.margin = 0
              bodyEl.style.width = options.threshold
              // bodyEl.css({
              //   margin: 0,
              //   width: options.threshold
              // });
            }


            if (options.dropoff) {
              htmlEl.style.fontSize = 'none'
              // htmlEl.css('font-size', 'none');
              return;
            }
          }
          htmlEl.style.fontSize = options.fontSize * factor + 'px'
          // htmlEl.css('font-size', options.fontSize * factor);

          if (options.dropoff && frontLine > options.threshold) {
            // alert('dsadas')
            htmlEl.style.fontSize = ''
            // htmlEl.css('font-size', '');
          }
        };

        if (options.baseline <= 0) {
          options.baseline = 1;
        }
        sizeConstraint();
        window.onresize = () => {
          sizeConstraint();
        }
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss">
</style>