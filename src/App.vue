<template>
  <transition
    name="fade-in"
    mode="out-in"
  >
    <router-view></router-view>
  </transition>
</template>

<style lang="less">
@import "./style/reset.less";
html,
body {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 250ms cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-in-enter,
.fade-in-leave-active {
  opacity: 0;
}
</style>
