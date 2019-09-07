<template>
  <div class="home">
    <card :dataCard="dataCard"></card>
    <card :dataCard="dataCard"></card>
    <card :dataCard="dataCard"></card>
    <card :dataCard="dataCard"></card>
    <card underline="none" :dataCard="dataCard"></card>
    <Page
      size="small"
      class-name="pagination"
      show-elevator
      :current="currentPage"
      :total="100"
      @on-change="handleChangePage" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

@Component({
  components: {
    Card,
  },
})
export default class Home extends Vue {
  private currentPage: number = 1;
  private searchCondition: string = '';
  private dataCard = {
    id: 123123321,
    serialNum: 1,
    title: 'this is title',
    summary: 'summary summary summary summary summary summary summary summary  summary summary summary',
    date: '2019.10.01',
    readingNum: 20,
    comments: 6,
  };
  private beforeMount () {
    const { condition, page } = this.$route.query;
    this.currentPage = (+page && +page > 0) ? +page : 1;
    this.getData(condition, +page);
  }
  private getData(condition: any, page: number): void {
    console.log(condition, page);
  }
  private handleChangePage(page: number): void {
    console.log(page);
    this.$router.push(`/blog?page=${page}`);
  }
}
</script>
<style lang="less" scoped>
.home {
  // background: #fff;
}
.pagination{
  margin-top: 3rem;
}
</style>
