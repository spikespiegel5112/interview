<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
      @toggleClick="toggleSideBar" />

    <!-- <breadcrumb class="common_breadcrumb_container" /> -->

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->
        <!-- <el-tooltip content="下载源码" effect="dark" placement="bottom"></el-tooltip> -->
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <span>{{$store.state.user.userInfo.account}}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='logout'>退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  // import Breadcrumb from '@/components/Breadcrumb'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import Hamburger from '@/components/Hamburger.vue'
  import Screenfull from '@/components/Screenfull'
  import SizeSelect from '@/components/SizeSelect'
  import Search from '@/components/HeaderSearch'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      Screenfull,
      SizeSelect,
      Search,
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'device'
      ]),
      setting: {
        get() {
          return this.$store.state.settings.showSettings
        },
        set(val) {
          this.$store.dispatch('settings/changeSetting', {
            key: 'showSettings',
            value: val
          })
        }
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      handleCommand(command) {
        switch (command) {
          case 'logout':
            this.logout()
            break;
        }
      },
      async logout() {
        this.$confirm('确定注销并退出系统吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('LogOut').then(() => {
            localStorage.removeItem("loginFlag");
            setTimeout(() => {
              this.$message.success('注销成功')
              this.$router.push({
                name: 'login'
              })
              location.reload();
            }, 0)

          })
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .navbar {
    height: 60px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
      display: inline-block;
      margin: 0 25px;
      /* line-height: 46px; */
      height: 100%;
      /* float: left; */
      vertical-align: middle;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }

      &:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      /* line-height: 50px; */

      &:focus {
        outline: none;
      }

      &:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        /* height: 100%; */
        font-size: 18px;
        color: #5a5e66;
        vertical-align: middle;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        padding: 0 25px 0 0;

        .avatar-wrapper {
          position: relative;
          color: #000;

          .user-avatar {
            display: inline-block;
            cursor: pointer;
            width: 24px;
            border-radius: 50%;
            vertical-align: middle;
          }

          span {
            display: inline-block;
            margin: 0 8px;
            cursor: pointer;
            vertical-align: middle;
            /* position: absolute; */
            /* right: -20px; */
            /* top: 25px; */
            font-size: 14px;
            opacity: 1;
          }
        }
      }
    }
  }
</style>