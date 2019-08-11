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
    }
  },
  beforeMount() {
    let { condition, page } = this.$route.query;
    this.getData({condition, page});
  },
  methods: {
    getData({condition, page}) {
      console.log(condition, page);
    },
  },
  // components: {
  //   HelloWorld,
  // },
})
export default class Home extends Vue {}
</script>
<style lang="less" scoped>
.home {
  // background: #fff;
}
</style>
