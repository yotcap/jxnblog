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
      :current="currentPage"
      :total="totalNum"
      @on-change="handleChangePage" />
  </div>
</template>

<script lang="ts">
import Axios from '@/lib/axios.js';
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

@Component({
  components: {
    Card,
  },
})
export default class Home extends Vue {
  private currentPage: number = 1;
  private totalNum: number = 0;
  private searchCondition: string = '';
  private dataCard = [];

  private beforeMount () {
    const { condition, page } = this.$route.query;
    this.currentPage = (+page && +page > 0) ? +page : 1;
    this.getData(condition ? condition : '', +page);
  }
  private getData(condition: string | Array<(string|null)>, page: number): void {
    console.log(condition, page);
    if (!page) page = 1;
    Axios({
      url: '/article/getList',
      params: {
        condition,
        page,
        pageSize: 10,
      },
    }).then((res: any) => {
      console.log(res, 'get-articles-list');
      this.dataCard = res.data.articleList;
      this.totalNum = res.data.totalNum;
    });
  }
  private handleChangePage(page: number): void {
    this.$router.push(`/blog?page=${page}&condition=${this.searchCondition}`);
    this.getData(this.searchCondition, page);
  }
}
</script>
<style lang="less" scoped>
.pagination {
  margin-top: 3rem;
}
</style>
