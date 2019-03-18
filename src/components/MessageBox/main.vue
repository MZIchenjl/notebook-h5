<template>
  <transition name="msgbox-fade">
    <div
      v-if="visible"
      class="msgbox-container"
    >
      <div
        class="msgbox-body"
        :class="[type, {center: center}]"
      >
        <span
          class="msgbox-icon"
          v-if="!!icon"
        >
          <fa-icon :icon="icon"></fa-icon>
        </span>
        <span class="msgbox-content">{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'MessageBox',
  props: {
    icon: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    center: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 1000
    },
    message: {
      type: String,
      default: ''
    },
    onClose: Function
  },
  watch: {
    visible (val) {
      val && this.doClose()
    }
  },
  methods: {
    doClose () {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        this.visible = false
        this.onClose && this.onClose()
      }, this.duration)
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes msgbox-fade-in {
  0% {
    transform: translate3d(0, -0.5rem, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes msgbox-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -0.5rem, 0);
    opacity: 0;
  }
}

.msgbox {
  &-fade-enter-active {
    animation: msgbox-fade-in 300ms;
  }

  &-fade-leave-active {
    animation: msgbox-fade-out 300ms;
  }
  &-container {
    top: 0.5rem;
    opacity: 1;
    width: 100%;
    display: flex;
    position: fixed;
    justify-content: flex-end;
  }
  &-body {
    width: 50vw;
    line-height: 1.5;
    color: #8f9399;
    font-weight: bold;
    font-size: 0.4rem;
    box-sizing: border-box;
    padding: 0.35rem 0.6rem;
    background-color: #f4f4f5;
    border: 0.02rem #ddd solid;
    &.center {
      text-align: center;
    }
    &.success {
      color: #76c64d;
      background-color: #f0f8eb;
    }
    &.warning {
      color: #e6a23b;
      background-color: #fdf6ec;
    }
    &.danger {
      color: #f56c6c;
      background-color: #fef0f0;
    }
  }
  &-icon {
    margin-right: 0.2rem;
  }
}
</style>
