<template>
  <div
    class="note"
    @click="handleJEdit"
  >
    <div class="note-title">
      <h4>{{ title || '无标题' }}</h4>
    </div>
    <div class="note-content">
      {{ scontent || '无内容' }}
    </div>
    <div class="note-footer">
      <div class="note-createat">
        创建于 {{ screateAt }}
      </div>
      <div class="note-updateat">
        更新于 {{ supdateAt }}
      </div>
    </div>
  </div>
</template>

<script>
const ONE_DAY = 24 * 60 * 60 * 1000
const padStart = (n, len, pad = '0') => {
  let ret = n.toString()
  let padLen = len - ret.length
  while (padLen > 0) {
    ret = pad + ret
    padLen--
  }
  return ret
}

export default {
  name: 'Note',
  props: {
    id: {
      type: Number,
      default: -1
    },
    title: {
      type: String,
      default: '无标题'
    },
    content: {
      type: String,
      default: '无内容'
    },
    createAt: {
      type: Number,
      default: 0
    },
    updateAt: {
      type: Number,
      default: 0
    }
  },
  computed: {
    scontent () {
      return this.content.slice(0, 100)
    },
    screateAt () {
      return this.tFormat(this.createAt)
    },
    supdateAt () {
      return this.tFormat(this.updateAt)
    }
  },
  methods: {
    tFormat (ts) {
      const t = new Date(ts)
      const now = new Date()
      const delta = now.getTime() - t.getTime()
      now.setHours(0, 0, 0, 0)
      const ys = now.getTime()
      if (delta >= ys - 2 * ONE_DAY) {
        return `${(delta / ONE_DAY).toFixed(0)}天前`
      } else if (delta >= ys - ONE_DAY) {
        return '前天'
      } else if (delta >= ys) {
        return '昨天'
      }
      return `${padStart(t.getHours(), 2, '0')}:${padStart(t.getMinutes(), 2, '0')}:${padStart(t.getSeconds(), 2, '0')}`
    },
    handleJEdit () {
      this.$router.push(`/note/-/${this.id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.note {
  padding: 0.6rem 0.2rem;
  font-size: 0.5rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #ccc;
  &:last-of-type {
    border-bottom: none;
  }
  &-title {
    line-height: 1;
    h4 {
      font-size: 0.6rem;
      color: #41b883;
      font-weight: 400;
      margin-top: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 0.2rem;
    }
  }
  &-footer {
    color: #ccc;
    font-size: 0.35rem;
    text-align: right;
  }
  &-createat {
    margin-bottom: 0.15rem;
  }
  &-content {
    color: #777;
    overflow: hidden;
    margin-top: 0.4rem;
    font-size: 0.45rem;
    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 3;
    margin-bottom: 0.6rem;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
}
</style>
