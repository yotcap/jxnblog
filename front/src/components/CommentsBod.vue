<template>
  <div class="com-boxer">
    <template v-if="data.length">
      <div :class="['item', index===data.length-1?'':'underline']" v-for="(item, index) in data" :key="item.id">
        <span class="name">{{item.name}}：</span><span>{{item.content}}</span>
      </div>
    </template>
    <div class="com-no-data" v-else>暂无评论</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Axios from '@/lib/axios.js';

@Component
export default class CommentsBod extends Vue {
  @Prop({
    type: Array,
    default: () => {
      return [];
    },
  })
  data: [];
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
    .name {
      color: #999;
    }
  }
  .com-no-data {
    text-align: center;
    color: #999;
  }
}
</style>
