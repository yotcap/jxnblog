<template>
  <div class="boxer-card">
    <h2 class="title cursor" @click="handleToDetail(dataCard.articleID)">{{dataCard.title}}</h2>
    <span class="summary cursor" :title="dataCard.summary" @click="handleToDetail(dataCard.articleID)">{{dataCard.summary}}</span>
    <div class="info">
      <!-- <span>{{dataCard.createTime}}</span> -->
      <span>{{handleTimeFormatte(dataCard.createTime)}}</span>
      <span>阅读数&nbsp;{{dataCard.readingNum}}</span>
      <span>{{dataCard.commontNum}}&nbsp;条评论</span>
    </div>
    <div v-if="underline !== 'none'" class="underline"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { __timeFormatter } from '@/lib/utils';

@Component
export default class Card extends Vue {
  @Prop({
    type: Object,
    default: () => {
      return {};
    },
  })
  private dataCard: {};
  @Prop({
    type: String,
    default: '',
  })
  private underline: string;
  private handleToDetail (id: string): void {
    this.$router.push(`/detail/${id}`);
  }
  private handleTimeFormatte (t: string) {
    return __timeFormatter(t, '-');
  }
}
</script>
<style scoped lang="less">
.boxer-card {
  margin-bottom: 1.5rem;
  .title {
    &:hover {
      text-decoration: underline;
    }
  }
  .title:hover {
    text-decoration: underline;
  }
  .summary {
    display: table-row;
    text-indent: 1rem;
  }
  .info {
    margin-top: .5rem;
    font-size: .8rem;
    color: #888;
    span:not(:first-child) {
      margin-left: 2rem;
    }
  }
  .underline {
    margin-top: 1rem;
  }
}
</style>
