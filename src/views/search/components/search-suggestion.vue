<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in suggestionList "
      icon="search"
      :key="index"
      @click="$emit('search', item)"
    >
      <div
        slot="title"
        v-html="highlight(item)"
      ></div>
    </van-cell>
  </div>

</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'loadsh'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestionList: []
    }
  },
  props: {
    searchVal: {
      type: String,
      required: true
    }
  },
  methods: {
    async getSuggestion (q) {
      try {
        const { data: res } = await getSuggestion(q)
        this.suggestionList = res.data.options
      } catch (error) {
        this.$toast('数据获取失败，请稍后再试' + error)
      }
    },
    highlight (val) {
      const highligtStr = '<span class="active">' + this.searchVal + '</span>'
      const reg = new RegExp(this.searchVal, 'gi')
      return val.replace(reg, highligtStr)
    }
  },
  watch: {
    searchVal: {
      handler: debounce(function (value) {
        this.getSuggestion(value)
      }, 200),
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #f00;
  }
}
</style>