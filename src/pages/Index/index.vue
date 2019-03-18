<template>
  <div id="page-login">
    <div id="login-form">
      <div class="form-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 196.32 170.02"
        >
          <path
            fill="#42b883"
            d="M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0h-75.49z"
          />
          <path
            fill="#35495e"
            d="M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0h-36.23z"
          />
        </svg>
      </div>
      <form
        class="login-form"
        method="post"
        @submit.prevent
      >
        <input-wrapper
          ref="username"
          :class="{error}"
          type="text"
          name="username"
          v-model="form.username"
          @input="resetError"
          placeholder="账号"
          class="form-control form-username"
          clearable
        ></input-wrapper>
        <input-wrapper
          :class="{error}"
          ref="password"
          type="password"
          name="password"
          v-model="form.password"
          placeholder="密码"
          @input="resetError"
          class="form-control form-password"
          clearable
        ></input-wrapper>
        <div class="form-control form-submit">
          <button
            class="btn btn-form-submit"
            type="submit"
            @click="handleLogin"
          >登陆</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import InputWrapper from '@/components/InputWrapper'

export default {
  name: 'Index',
  components: {
    InputWrapper
  },
  data () {
    return {
      error: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    resetError () {
      this.error = false
    },
    handleBlur () {
      this.$refs['username'].$el.querySelector('input').blur()
      this.$refs['password'].$el.querySelector('input').blur()
    },
    handleLogin () {
      const { form } = this
      this.handleBlur()
      if (!form.username || !form.password) {
        this.error = true
        this.$msg({
          type: 'danger',
          duration: 800,
          message: '账号和密码不得为空'
        })
      } else {
        this.$msg({
          type: 'success',
          message: '登陆成功',
          duration: 800,
          onClose: () => {
            this.$router.push('/home')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
#page-login {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
}
#login-form {
  width: 100%;
  display: block;
  height: 8.8rem;
  max-width: 9rem;
  margin: 0 auto;
  .login-form {
    margin: 0.5rem auto;
    box-sizing: border-box;
  }
  .form {
    &-logo {
      width: 3rem;
      height: auto;
      margin: 0.3rem auto;
    }
    &-submit {
      margin-top: 0.5rem;
    }
    &-username {
      border-bottom: none;
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;
    }
    &-password {
      border-bottom-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
    }
  }
  .btn {
    border: none;
    outline: none;
    background-color: transparent;
    &-form-submit {
      font-size: 0.6rem;
      width: 100%;
      display: block;
      text-align: center;
      background-color: #41b883;
      color: #fff;
      box-sizing: border-box;
      padding: 0.4rem;
      border-radius: 0.2rem;
      user-select: none;
      cursor: pointer;
      &:focus {
        background-color: #3da777;
      }
    }
  }
}
</style>
