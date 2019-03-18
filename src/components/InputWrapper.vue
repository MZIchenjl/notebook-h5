<template>
  <div class="input-wrapper">
    <input
      v-bind="$attrs"
      class="input"
      :class="{clearable: clearable && !!text.length}"
      v-model="text"
      autocomplete="off"
    />
    <fa-icon
      v-if="clearable && !!text.length"
      class="clear"
      @click="handleClear"
      icon="times-circle"
    ></fa-icon>
  </div>
</template>

<script>
export default {
  name: 'InputWrapper',
  props: {
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return { text: this.$attrs['value'] || '' }
  },
  watch: {
    text (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleClear () {
      this.text = ''
    }
  }
}
</script>

<style lang="less" scoped>
.input {
  padding: 0;
  width: 100%;
  border: none;
  outline: none;
  display: block;
  line-height: 1;
  font-size: 0.6rem;
  box-sizing: border-box;
  background-color: transparent;
  &.clearable {
    width: calc(~"100% - 0.8rem");
  }
  &-wrapper {
    padding: 0.4rem;
    position: relative;
    border: 0.03rem solid #ccc;
    &.error {
      border-color: #f56c6c;
      .clear {
        color: #f56c6c;
      }
      .input {
        color: #f56c6c;
      }
    }
    .clear {
      color: #ccc;
      top: 0.5rem;
      right: 0.4rem;
      font-size: 0.5rem;
      position: absolute;
    }
  }
}
</style>
