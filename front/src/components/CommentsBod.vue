<template>
  <div class="com-boxer">
    <template v-if="data.length">
      <div :class="['item', index===data.length-1?'':'underline']" v-for="(item, index) in data" :key="item.id">
        <span class="name">{{item.name}}：</span><span>{{item.content}}</span>
        <span class="date">{{handleTimeformatter(item.createTime)}}</span>
      </div>
    </template>
    <div class="com-no-data" v-else>暂无{{words}}</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Axios from '@/lib/axios.js';
import { __timeFormatter } from '@/lib/utils';

@Component
export default class CommentsBod extends Vue {
  @Prop({
    type: Array,
    default: () => {
      return [];
    },
  })
  data: [];
  words: string = '评论';
  beforeMount () {
    if (this.$route.name === 'msg') this.words = '留言';
  }
  handleTimeformatter (val: string) {
    return __timeFormatter(val);
  }
}

</script>
<style scoped lang="less">
.underline {
  border-bottom-style: dotted;
}
.com-boxer {
  padding: 0 1rem;
  .item {
    padding: 1rem 0;
    position: relative;
    .name {
      color: #999;
    }
    .date {
      .name;
      position: absolute;
      right: 0;
      font-size: 0.875rem;
    }
  }
  .com-no-data {
    text-align: center;
    color: #999;
  }
}
</style>
