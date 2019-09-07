<template>
  <header>
    <Row type="flex" align="middle" justify="space-between" class="container">
      <Col class="cursor" :xs="{ offset: 1 }" :lg="{ offset: 0 }">JXN</Col>
      <Col :xs="{ pull: 1 }" v-if="flagShowMenuIcon"><i class="iconfont icon-menu cursor" @click="handleShowMenu"></i></Col>
    </Row>
  </header>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'jx-header',
  data() {
    return {
      // flagDrawer: false,
    };
  },
  computed: {
    ...mapState([
      'flagShowMenuIcon',
    ]),
  },
  created() {
    this.onResize();
    window.onresize = this.onResize;
  },
  methods: {
    handleShowMenu () {
      this.handleDrawerShow(true);
    },
    ...mapMutations([
      'onResize',
      'handleDrawerShow',
    ]),
  },
};
</script>
<style scoped lang="less">
.icon-menu {
  font-size: 14px;
}
</style>
