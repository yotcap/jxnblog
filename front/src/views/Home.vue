<template>
  <div class="home">
    home
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  private page: number = 1;
  private searchCondition: string = '';
  private beforeMount() {
    const { condition, page } = this.$route.query;
    this.getData(condition, page);
  }
  private getData(condition: any, page: any): void {
    console.log(condition, page);
  }
}
</script>
<style lang="less" scoped>
.home {
  // background: #fff;
}
</style>
