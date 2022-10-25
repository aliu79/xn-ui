<template>
  <div class="header">
    <div class="container">
      <h1 class="flex align-items-center">
        <a href="#/">
          <img
            src="../assets/images/smile.gif"
          />
        </a>
        <small style="font-weight: normal" class="fz-14">{{version}}</small>
      </h1>
      <ul class="menu">
        <li class="menu-item">
          <router-link
            active-class="active"
            exact-active-class="active"
            exact
            tag="a"
            to="/"
            >首页</router-link
          >
        </li>
        <li class="menu-item">
          <router-link
            active-class="active"
            exact-active-class="active"
            tag="a"
            to="/component"
            >组件</router-link
          >
        </li>
        <li class="menu-item">
          <router-link
            active-class="active"
            exact-active-class="active"
            exact
            tag="a"
            to="/other"
            >其他</router-link
          >
        </li>
        <li class="menu-item gitee">
          <a href="">
            <img src="../assets/images/gitee.svg" alt="" srcset="" />
          </a>
        </li>
        <!-- <li  class="menu-item">
          <i class="el-icon-sunny"></i>
          <i class="el-icon-moon"></i>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
const version = require('xn-ui/package.json').version
export default {
  data() {
    return {
      offon: false,
    };
  },
  computed:{
    version(){
      return `v${version}`
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 64px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px #f0f1f2;
  background-color: #fff;
  .container {
    width: 100%;
    box-sizing: border-box;
    padding: 0 60px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      margin: 0;
      overflow: hidden;
      img {
        display: block;
        width: 40px;
      }
    }
    .menu {
      list-style: none;
      padding: 0;
      height: 100%;
      .menu-item {
        height: 63px;
        line-height: 60px;
        display: inline-block;
        padding: 0 22px;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.85);
        &.gitee {
          img {
            vertical-align: -4px;
            width: 20px;
          }
        }
        a {
          color:#202131;
          display: inline-block;
          line-height: 60px;
          padding: 0 8px;
          transition: all 0.3s ease-in-out;
          border-bottom: 3px solid transparent;
          &:hover,
          &.active {
            border-color: #fe554b;
            color: #fe554b;
          }
        }
      }
    }
    // background-color: #f00;
  }
}
</style>