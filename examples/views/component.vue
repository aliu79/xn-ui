<template>
  <div class="app-container page-container">
    <div class="doc-nav">
      <ol>
        <li class="doc-nav-item__group-title">组件</li>
        <ul class="doc-nav-item__group-list">
          <router-link
            to="/component/table"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">表格</span>
          </router-link>
          <router-link
            to="/component/search"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">查询条件</span>
          </router-link>
          <router-link
            to="/component/import"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">导入</span>
          </router-link>
          <router-link
            to="/component/upload"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">上传</span>
          </router-link>
          <router-link
            to="/component/city"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">选择城市</span>
          </router-link>
          <router-link
            to="/component/footer"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">底部状态栏</span>
          </router-link>
          <router-link
            to="/component/tip"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">提示</span>
          </router-link>
          <router-link
            to="/component/tag"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">Tag</span>
          </router-link>
        </ul>
      </ol>
      <ol>
        <li class="doc-nav-item__group-title">工具</li>
        <ul class="doc-nav-item__group-list">
          <router-link
            to="/component/tool"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">一些工具</span>
          </router-link>
          <router-link
            to="/component/reg"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">一些正则</span>
          </router-link>
          <router-link
            to="/component/format"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">数值计算/格式化</span>
          </router-link>
          <router-link
            to="/component/computed"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">任意框计算</span>
          </router-link>
          <router-link
            to="/component/code"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">获取权限码</span>
          </router-link>
          <router-link
            to="/component/more"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">更多</span>
          </router-link>
        </ul>
      </ol>
      <ol>
        <li class="doc-nav-item__group-title">内置样式</li>
        <ul class="doc-nav-item__group-list">
          <router-link
            to="/component/css"
            exact-active-class="active"
            tag="li"
            class="doc-nav-item__group-list-item"
          >
            <span class="pl-5">公共样式</span>
          </router-link>
        </ul>
      </ol>
    </div>
    <el-scrollbar
      class="doc-container page-component__scroll"
      ref="componentScrollBar"
    >
      <div class="document">
        <router-view></router-view>
      </div>
      <el-backtop
        target=".page-component__scroll .el-scrollbar__wrap"
        :right="100"
        :bottom="150"
      ></el-backtop>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: 0,
      showHeader: true,
      componentScrollBar: null,
      componentScrollBoxElement: null,
    };
  },
  mounted() {
    this.componentScrollBar = this.$refs.componentScrollBar;
    this.componentScrollBox = this.componentScrollBar.$el.querySelector(
      ".el-scrollbar__wrap"
    );
    this.renderAnchorHref();
    this.goAnchor();
  },
  watch: {
    "$route.path"() {
      // 触发伪滚动条更新
      this.componentScrollBox.scrollTop = 0;
      this.$nextTick(() => {
        this.componentScrollBar.update();
      });
    },
  },
  methods: {
    renderAnchorHref() {
      if (/changelog/g.test(location.href)) return;
      const anchors = document.querySelectorAll("h2 a,h3 a,h4 a,h5 a");
      const basePath = location.href.split("#").splice(0, 2).join("#");

      [].slice.call(anchors).forEach((a) => {
        const href = a.getAttribute("href");
        a.href = basePath + href;
      });
    },

    goAnchor() {
      if (location.href.match(/#/g).length > 1) {
        const anchor = location.href.match(/#[^#]+$/g);
        if (!anchor) return;
        const elm = document.querySelector(anchor[0]);
        if (!elm) return;

        setTimeout(() => {
          this.componentScrollBox.scrollTop = elm.offsetTop;
        }, 50);
      }
    },
    handleScroll() {
      const scrollTop = this.componentScrollBox.scrollTop;
      if (this.showHeader !== this.scrollTop > scrollTop) {
        this.showHeader = this.scrollTop > scrollTop;
      }
      if (scrollTop === 0) {
        this.showHeader = true;
      }
      if (!this.navFaded) {
        // bus.$emit('fadeNav');
      }
      this.scrollTop = scrollTop;
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
    setTimeout(() => {
      const toPath = to.path;
      const fromPath = from.path;
      if (toPath === fromPath && to.hash) {
        this.goAnchor();
      }
      if (toPath !== fromPath) {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        this.renderAnchorHref();
      }
    }, 100);
  },
  beforeDestroy() {
    this.componentScrollBox.removeEventListener(
      "scroll",
      this.throttledScrollHandler
    );
  },
};
</script>

<style scoped lang="scss">
.doc-nav {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  margin-top: 64px;
  border-right: 1px solid #f0f0f0;
  width: 240px;
  overflow-y: scroll;
}
.doc-container {
  margin: 0 0 0 240px;
  .document {
    padding: 0 30px;
  }
}
.doc-nav-item {
  &__group {
    &-title {
      color: rgba(0, 0, 0, 0.45);
      margin-top: 16px;
      margin-bottom: 16px;
      font-size: 13px;
      line-height: 1.5715;
      padding: 8px 16px 8px 35px;
      &::after {
        content: "";
        position: relative;
        top: 12px;
        display: block;
        width: calc(100% - 20px);
        height: 1px;
        background: #f0f0f0;
      }
    }
    &-list {
      &-item {
        box-sizing: border-box;
        width: calc(100% + 1px);
        height: 40px;
        margin-top: 4px;
        margin-bottom: 4px;
        padding: 0 16px 0 35px;
        overflow: hidden;
        line-height: 40px;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        position: relative;
        font-size: 14px;
        transition: border-color 0.3s, background 0.3s,
          padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
        &::after {
          position: absolute;
          content: "";
          top: 0;
          right: 0;
          bottom: 0;
          border-right: 3px solid #fe554b;
          transform: scaleY(0.0001);
          opacity: 0;
          transition: opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
            transform 0.15s;
        }
        &.active {
          background: rgba(254, 85, 75, 0.1);
          &::after {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        a {
          color: rgba(0, 0, 0, 0.85);
          transition: color 0.3s;
          position: relative;
        }
      }
    }
  }
}
</style>