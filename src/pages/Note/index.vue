<template>
  <div id="page-note">
    <div class="note-container">
      <div class="note-title">
        <input
          class="note-title-input"
          type="text"
          @input="mod =true"
          placeholder="无标题"
          v-model="title"
        >
      </div>
      <div class="note-content">
        <textarea
          @input="mod =true"
          placeholder="请输入想记录的文字"
          class="note-content-textarea"
          v-model="content"
        ></textarea>
      </div>
      <div
        class="btn-group btn-ops"
        :class="{in: menuIn}"
      >
        <transition name="fade-btn">
          <span
            role="button"
            v-if="menuNIn"
            class="btn btn-back"
            @click="goBack"
          >
            <fa-icon icon="chevron-left"></fa-icon>
          </span>
        </transition>
        <transition name="fade-btn">
          <span
            role="button"
            v-if="menuNIn"
            class="btn btn-save"
            @click="handleUpdateNote"
          >
            <fa-icon icon="check"></fa-icon>
          </span>
        </transition>
        <transition name="fade-btn">
          <span
            role="button"
            v-if="menuNIn"
            class="btn btn-del"
            @click="handleDeleteNote"
          >
            <fa-icon icon="trash"></fa-icon>
          </span>
        </transition>
        <span
          role="button"
          class="btn btn-menu"
          :class="{close: menuNIn, open: !menuNIn}"
          @click="handleMenuToggle"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { GetNoteByID, UpdateNote, DeleteNote } from '@/db'

export default {
  name: 'Note',
  created () {
    const noteID = Number.parseInt(this.$route.params['id'] || '-1')
    this.id = noteID
    GetNoteByID(noteID)
      .then(res => {
        this.title = res.title
        this.content = res.content
      }).catch(res => {
        this.$msg({
          type: 'danger',
          message: '读取笔记失败！',
          duration: 800,
          onClose: () => {
            this.goBack()
          }
        })
      })
  },
  mounted () {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      this.menuIn = true
    }, 0)
  },
  data () {
    return {
      id: -1,
      title: '',
      content: '',
      mod: false,
      menuIn: false,
      menuNIn: false
    }
  },
  computed: {
    isNew () {
      return this.id === -1
    }
  },
  methods: {
    back () {
      this.menuNIn = false
      const timer = setTimeout(() => {
        clearTimeout(timer)
        this.$router.back()
      }, 250)
    },
    goBack () {
      if (!this.mod) {
        this.back()
      } else {
        this.menuNIn = false
        this.$confirm('笔记未保存，需要保存？')
          .then(() => {
            this.handleUpdateNote()
              .then(() => {
                this.back()
              })
          }).catch(() => {
            this.back()
          })
      }
    },
    handleMenuToggle () {
      this.menuNIn = !this.menuNIn
    },
    handleUpdateNote () {
      this.menuNIn = false
      const { title, content } = this
      return UpdateNote(this.id, { title, content, updateAt: Date.now() })
        .then(res => {
          this.mod = false
          this.$msg({
            type: 'success',
            message: '保存笔记成功！',
            duration: 800
          })
        }).catch(res => {
          this.$msg({
            type: 'danger',
            message: '保存笔记失败！',
            duration: 800
          })
        })
    },
    handleDeleteNote () {
      this.mod = false
      this.menuNIn = false
      this.$confirm('确定删除此篇笔记？')
        .then(() => {
          DeleteNote(this.id)
            .then(res => {
              this.$msg({
                type: 'success',
                message: '删除笔记成功！',
                duration: 800,
                onClose: () => {
                  this.goBack()
                }
              })
            }).catch(res => {
              this.$msg({
                type: 'danger',
                message: '删除笔记失败！',
                duration: 800
              })
            })
        }).catch(() => { })
    }
  }
}
</script>

<style lang="less" scoped>
#page-note {
  height: 100%;
}
.note {
  &-container {
    display: flex;
    height: 100%;
    padding: 0.2rem;
    flex-direction: column;
    box-sizing: border-box;
  }
  &-title {
    padding-top: 0.2rem;
    padding: 0.4rem 0.2rem;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 0.02rem solid #ccc;
    &-input {
      padding: 0;
      width: 100%;
      color: #333;
      border: none;
      outline: none;
      display: block;
      line-height: 1;
      font-size: 0.55rem;
      background-color: transparent;
    }
  }
  &-content {
    padding: 0.2rem;
    margin-top: 0.2rem;
    background-color: #fff;
    box-sizing: border-box;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    &-textarea {
      flex-grow: 1;
      color: #777;
      width: 100%;
      height: 100%;
      display: block;
      border: none;
      outline: none;
      resize: none;
      line-height: 1.5;
      font-weight: 400;
      font-size: 0.45rem;
      background-color: transparent;
    }
  }
}
.fade-btn {
  &-enter-active,
  &-leave-active {
    transition: all 250ms cubic-bezier(0.55, 0, 0.1, 1);
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(2rem);
  }
  &-enter-to,
  &-leave {
    opacity: 1;
    transform: translateY(0);
  }
}
.btn {
  color: #fff;
  width: 1.8rem;
  display: flex;
  height: 1.8rem;
  position: fixed;
  font-size: 0.7rem;
  align-items: center;
  border-radius: 100%;
  justify-content: center;
  background-color: #41b883;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  &-back {
    bottom: 6.9rem;
    transition-delay: 100ms;
    background-color: #8f9399;
  }
  &-save {
    bottom: 4.9rem;
    transition-delay: 50ms;
    background-color: #3f9eff;
  }
  &-del {
    bottom: 2.9rem;
    transition-delay: 0;
    background-color: #f56c6c;
  }
  &-ops {
    opacity: 0;
    right: 0.9rem;
    bottom: -0.9rem;
    position: fixed;
    transition: all 250ms cubic-bezier(0.55, 0, 0.1, 1);
    &.in {
      bottom: 0.9rem;
      opacity: 1;
    }
    [role="button"] {
      user-select: none;
    }
  }
  &-menu {
    position: relative;
    transition: all 250ms cubic-bezier(0.55, 0, 0.1, 1);
    &::after,
    &::before {
      transition: all 250ms cubic-bezier(0.55, 0, 0.1, 1);
    }
    &.open::after {
      content: "";
      top: 0.55rem;
      width: 0.5rem;
      height: 0.5rem;
      right: 0.55rem;
      display: block;
      position: absolute;
      border-radius: 100%;
      border: 0.1rem solid #fff;
    }
    &.close::before {
      content: "";
      top: 0.56rem;
      width: 0.75rem;
      right: 0.4rem;
      display: block;
      position: absolute;
      height: 0.1rem;
      background-color: #fff;
      transform: rotateZ(45deg);
      transform-origin: left;
    }
    &.close::after {
      content: "";
      top: 1.08rem;
      width: 0.75rem;
      right: 0.4rem;
      display: block;
      position: absolute;
      height: 0.1rem;
      background-color: #fff;
      transform: rotateZ(-45deg);
      transform-origin: left;
    }
  }
}
</style>
