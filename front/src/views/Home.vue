<template>
  <div class="home">
    home
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  data() {
    return {
      page: 1,
      searchCondition: '',
    };
  },
  // beforeMount() {
  //   const { condition, page } = this.$route.query;
  //   (this as any).getData({condition, page});
  // },
  // methods: {
  //   getData({condition, page}) {
  //     console.log(condition, page);
  //   },
  // },
  // components: {
  //   HelloWorld,
  // },
})
export default class Home extends Vue {
  private page: number = 1;
  private searchCondition: string = '';
  private beforeMount() {
    // const { condition, page } = this.$route.query;
    (this as any).getData(this.$route.query);
  }
  private getData({condition, page}) {
    console.log(condition, page);
  }
}
</script>
<style lang="less" scoped>
.home {
  // background: #fff;
}
</style>
