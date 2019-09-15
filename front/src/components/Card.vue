<template>
  <div class="boxer-card">
    <h2 class="title cursor" @click="handleToDetail(dataCard.id)">{{dataCard.title}}</h2>
    <span class="summary cursor" @click="handleToDetail(dataCard.id)">{{dataCard.summary}}</span>
    <div class="info">
      <span>{{dataCard.date}}</span>
      <span>阅读数&nbsp;{{dataCard.readingNum}}</span>
      <span>{{dataCard.comments}}&nbsp;条评论</span>
    </div>
    <div v-if="underline !== 'none'" class="underline"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

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
