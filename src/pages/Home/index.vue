<template>
  <div id="page-home">
    <div
      id="page-loading"
      class="page-msg"
      v-if="loading"
    >
      <div class="page-msg-body">
        <fa-icon
          class="loading"
          icon="spinner"
        ></fa-icon>
        <div class="msg-text">加载中...</div>
      </div>
    </div>
    <template v-else>
      <div
        id="page-error"
        class="page-msg"
        v-if="error"
      >
        <div class="page-msg-body">
          <fa-icon
            class="danger"
            icon="exclamation-triangle"
          ></fa-icon>
          <div class="danger msg-text">获取笔记列表失败</div>
        </div>
      </div>
      <div
        id="page-note"
        v-else-if="!notes.length"
        class="page-msg"
      >
        <div class="page-msg-body">
          <fa-icon
            class="normal"
            icon="exclamation-triangle"
          ></fa-icon>
          <div class="normal msg-text">笔记列表为空，点击“+”添加新的笔记</div>
        </div>
      </div>
      <div
        id="page-note-list"
        v-else
      >
        <note
          v-for="note in notes"
          :key="note.id"
          v-bind="note"
        ></note>
      </div>
    </template>
    <button
      role="button"
      type="button"
      @click="handleJNew"
      class="btn btn-circle btn-plus"
      :class="{in: btnIn}"
    >
      <fa-icon icon="plus"></fa-icon>
    </button>
  </div>
</template>

<script>
import Note from './Note'

import { NewNote, GetAllNotes } from '@/db'

export default {
  name: 'Home',
  components: {
    Note
  },
  data () {
    return {
      btnIn: false,
      loading: true,
      error: false,
      notes: []
    }
  },
  mounted () {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      this.btnIn = true
      this.fetchAllNotes()
    }, 0)
  },
  methods: {
    handleJNew () {
      NewNote()
        .then(res => {
          this.btnIn = false
          const id = res.target.result
          const timer = setTimeout(() => {
            clearTimeout(timer)
            this.$router.push(`/note/-/${id}`)
          }, 250)
        })
        .catch(() => {
          this.$msg({
            type: 'danger',
            message: '新建笔记失败！',
            duration: 800
          })
        })
    },
    fetchAllNotes () {
      GetAllNotes()
        .then(res => {
          this.loading = false
          this.notes = res.reverse()
        }).catch(() => {
          this.loading = false
          this.error = true
          this.$msg({
            type: 'danger',
            message: '获取笔记列表失败！',
            duration: 800
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  border: none;
  outline: none;
  background-color: transparent;
  &-circle {
    border-radius: 100%;
  }
  &-plus {
    opacity: 0;
    right: 1.2rem;
    bottom: -1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    font-size: 0.4rem;
    transform: rotateZ(45deg);
    color: #fff;
    position: fixed;
    display: inline-block;
    background-color: #41b883;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    transition: all 250ms cubic-bezier(0.55, 0, 0.1, 1);
    user-select: none;
    &.in {
      opacity: 1;
      right: 0.9rem;
      bottom: 0.9rem;
      width: 1.8rem;
      height: 1.8rem;
      font-size: 0.6rem;
      transform: rotateZ(0deg);
    }
  }
}
@keyframes loading {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.loading {
  animation: loading 2s linear infinite;
}
.page-msg {
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  &-body {
    text-align: center;
    .msg-text {
      font-size: 0.4rem;
      margin-top: 0.4rem;
    }
  }
  .danger {
    color: #e6a23b;
  }
  .normal {
    color: #999;
  }
}
#page-note-list {
  padding: 0 0.2rem;
  padding-bottom: 5rem;
}
</style>
