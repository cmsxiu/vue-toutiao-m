<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in dataList"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>

</template>

<script>
import { getResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchVal: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dataList: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data: res } = await getResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchVal
        })
        const { results } = res.data
        this.dataList.push(...results)

        // 本次加载完成后，设置状态为结束
        this.loading = false
        // 判断数据还有数据
        if (results.length) {
          this.page++
        } else {
          // 没有数据了，将 finished 设置为 true
          this.finished = true
        }
      } catch (error) {
        this.$toast.fail('加载失败，请点击重试：' + error)
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>