<template>
  <header>
    <Row type="flex" align="middle" justify="space-between" class="container">
      <Col class="cursor" :xs="{ offset: 1 }" :lg="{ offset: 0 }">JXN</Col>
      <Col :xs="{ pull: 1 }" v-if="isShowMenuIcon"><i class="iconfont icon-menu cursor" @click="handleShowMenu"></i></Col>
    </Row>
  </header>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'JXHeader',
  data() {
    return {
      // isShowMenuIcon: false,
    };
  },
  computed: {
    ...mapState([
      'isShowMenuIcon',
    ]),
  },
  created() {
    this.onResize();
    window.onresize = this.onResize;
  },
  methods: {
    handleShowMenu() {
      // ...
    },
    ...mapMutations([
      'onResize',
    ]),
  },
};
</script>
<style scoped lang="less">
.icon-menu {
  font-size: 14px;
}
</style>
