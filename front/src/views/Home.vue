<template>
  <div class="home">
    <card
      v-for="(item, index) in dataCard"
      :key="item.articleID"
      :underline="index === dataCard.length-1 ? 'none' : ''"
      :dataCard="item" />
    <Page
      size="small"
      class-name="pagination"
      show-elevator
      show-total
      :current="currentPage"
      :total="totalNum"
      @on-change="handleChangePage" />
  </div>
</template>

<script lang="ts">
import Axios from '@/lib/axios.js';
import { Component, Vue, Watch } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

@Component({
  components: {
    Card,
  },
})
export default class Home extends Vue {
  private currentPage: number = 1;
  private totalNum: number = 0;
  private searchCondition: string | Array<string | null> = '';     // 搜索条件
  private cate: string | Array<string | null> = '';    // 文章分类
  private date: string | Array<string | null> = '';    // 日期
  private dataCard = [];
  @Watch('$route')
  watchRoute(to: any, from: any) {
    if (to.query !== from.query) {
      this.getData();
    }
  }
  private beforeMount () {
    this.getData();
  }
  private getData(): void {
    const { condition, page, cate, date } = this.$route.query;
    this.currentPage = (+page && +page > 0) ? +page : 1;
    this.searchCondition = condition;
    this.date = date;
    this.cate = cate;
    Axios({
      url: '/article/getList',
      params: {
        pageSize: this.$config.pageSize,
        page: this.currentPage,
        condition: this.searchCondition,
        cate,
        date,
      },
    }).then((res: any) => {
      this.dataCard = res.data.articleList;
      this.totalNum = res.data.totalNum;
    });
  }
  private handleChangePage(page: number): void {
    const u = `/blog?page=${page}${this.searchCondition ? '&condition=' + this.searchCondition : ''}${this.date ? '&date=' + this.date : ''}${this.cate ? '&cate=' + this.cate : ''}`;
    this.$router.push(u);
    this.getData();
  }
}
</script>
<style lang="less" scoped>
.pagination {
  margin-top: 3rem;
}
</style>
