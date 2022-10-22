<template>
  <div class="home">
    <h1 class="text-center">持续更新中......</h1>
    <div class="ball">
      <div class="round"></div>
      <div class="round-right"></div>
    </div>
    <lottie
      class="lottie"
      :options="defaultOptions"
      @animCreated="handleAnimation"
    />
    <div class="text-center">
      <el-button
        @click="start"
        type="primary"
        round
        icon="el-icon--right el-icon-magic-stick"
        size="default"
        >开始</el-button
      >
    </div>
  </div>
</template>

<script>
import lottie from "vue-lottie";
import animationData from "../assets/lottie/home.json";
export default {
  name: "Home",
  components: {
    lottie,
  },
  data() {
    return {
      defaultOptions: { animationData: animationData },
      animationSpeed: 1,
      anim: {},
    };
  },
  created() {},
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    start(){
      this.$router.push({
        path:'/component'
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  h1 {
    font-size: 34px;
    letter-spacing: 4px;
    margin: 0;
  }
}
.lottie {
  height: 500px !important;
}
@keyframes ball {
  0% {
    transform: translateZ(0);
  }
  25% {
    transform: translate3d(-20%, -20%, 0);
  }
  50% {
    transform: translate3d(0, -40%, 0);
  }
  75% {
    transform: translate3d(20%, -20%, 0);
  }
  to {
    transform: translateZ(0);
  }
}
.ball {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
}
.round {
  &::before,
  &::after {
    content: "";
    position: absolute;
    background: radial-gradient(
      32.41% 40.79%,
      #fcf8ef -10%,
      rgba(254, 85, 75, 0.4) 100%
    );
    border-radius: 50%;
    left: -15%;
  }
  &::before {
    width: 380px;
    height: 380px;
    opacity: 0.3;
    top: 35%;
    animation: ball 15s cubic-bezier(0.645, 0.045, 0.355, 1) 1.5s infinite;
  }
  &::after {
    width: 150px;
    height: 150px;
    top: 40%;
    opacity: 0.5;
    left: 5%;
    animation: ball 15s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s infinite;
  }
}
.round-right {
  &::before,
  &::after {
    content: "";
    position: absolute;
    background: radial-gradient(
      32.41% 40.79%,
      #fcf8ef -10%,
      rgba(254, 85, 75, 0.4) 100%
    );
    border-radius: 50%;
  }
  &::before {
    width: 276px;
    height: 276px;
    opacity: 0.2;
    top: 40%;
    right: -5%;
  }
  &::after {
    width: 150px;
    height: 150px;
    top: 30%;
    opacity: 0.5;
    right: 5%;
  }
}
</style>
