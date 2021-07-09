<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchVal"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="searchResultShow = false"
        background="#3296fa"
      />
    </form>
    <!-- 搜索栏 end -->

    <!-- 搜索结果 -->
    <search-result
      v-if="searchResultShow"
      :search-val="searchVal"
    ></search-result>
    <!-- 搜索结果 end -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchVal"
      :search-val="searchVal"
      @search="onSearch"
    ></search-suggestion>
    <!-- 联想建议 end -->

    <!-- 历史记录 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @clear-search-histories="searchHistories = []"
      @search="onSearch"
    ></search-history>
    <!-- 历史记录 end-->
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/setStorage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchVal: '',
      searchResultShow: false, // 搜索结果显示
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 获取 搜索历史记录
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  methods: {
    onSearch (val) {
      this.searchVal = val
      // 存储搜索历史记录
      // 要求：不要有重复的历史记录，最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)

      // 渲染搜索结果
      this.searchResultShow = true
    },
    onCancel () {
      this.$router.push('/')
    }
  },
  watch: {
    searchHistories (val) {
      setItem('TOUTIAO_SEARCH_HISTORIES', val)
    }
  }
}
</script>
<style lang="less" scoped>
.search-container {
  .van-search__action {
    font-size: 28px;
    color: #fff;
    margin: 0 24px;
    &:active {
      background: rgba(0, 0, 0, 0);
    }
  }
  .text-indent {
    text-indent: 2em;
  }
}
</style>