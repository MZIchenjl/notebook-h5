<template>
  <transition name="confirm-fade">
    <div
      v-if="visible"
      class="confirm-container"
      @click="handleClose"
    >
      <div
        class="confirm-body"
        @click="shouldClose = false"
      >
        <div
          v-if="!!title.length"
          class="confirm-title"
        >{{ title }}</div>
        <div class="confirm-content">
          <span class="confirm-content">{{ message }}</span>
        </div>
        <div class="confirm-footer">
          <button
            role="button"
            type="button"
            class="btn btn-cancel"
            @click="reject(false)"
          >{{ cancelText }}</button>
          <button
            role="button"
            type="button"
            class="btn btn-confirm"
            @click="resolve(true)"
          >{{ confirmText }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Confirm',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    resolve: Function,
    reject: Function
  },
  data () {
    return {
      shouldClose: null
    }
  },
  methods: {
    handleClose () {
      let { shouldClose } = this
      if (shouldClose === null) {
        shouldClose = true
      }
      if (shouldClose) {
        this.reject && this.reject(false)
      }
      this.shouldClose = null
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes msgbox-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes msgbox-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.confirm {
  &-fade-enter-active {
    animation: msgbox-fade-in 300ms;
  }

  &-fade-leave-active {
    animation: msgbox-fade-out 300ms;
  }
  &-container {
    top: 0;
    z-index: 5;
    opacity: 1;
    width: 100%;
    height: 100%;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
  }
  &-body {
    width: 60vw;
    display: inline-block;
    border-radius: 0.1rem;
    padding: 0.5rem;
    background-color: #fff;
    box-shadow: 0.02rem 0.02rem 0.1rem rgba(0, 0, 0, 0.2);
  }
  &-title {
    font-size: 0.5rem;
    font-weight: 500;
    padding: 0.1rem 0;
    padding-bottom: 0.15rem;
    border-bottom: 0.02rem solid #ddd;
  }
  &-content {
    color: #555;
    font-size: 0.4rem;
    padding: 0.25rem 0;
  }
  &-footer {
    font-size: 0;
    margin-top: 0.5rem;
    text-align: right;
    .btn {
      border: none;
      outline: none;
      font-size: 0.35rem;
      padding: 0.2rem 0.4rem;
      display: inline-block;
      background-color: transparent;
      border-radius: 0.1rem;
      border: 0.02rem solid #42b883;
      &-cancel {
        color: #42b883;
        margin-right: 0.2rem;
      }
      &-confirm {
        color: #fff;
        background-color: #42b883;
      }
    }
  }
}
</style>
