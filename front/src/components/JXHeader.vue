<template>
  <header>
    <Row type="flex" align="middle" justify="space-between" class="container">
      <Col :xs="{ offset: 1 }" :lg="{ offset: 0 }"><span class="main-pa cursor" @click="handleTo('home')">JXN</span></Col>
      <Col :xs="{ pull: 1 }" v-if="flagShowMenuIcon"><i class="iconfont icon-menu cursor" @click="handleShowMenu"></i></Col>
      <Col :xs="{ pull: 1 }" v-else>
        <ul>
          <li @click="handleTo('home')">首页</li>
          <li @click="handleTo('msg')">留言板</li>
        </ul>
      </Col>
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
    handleTo (opt) {
      switch (opt) {
        case 'home':
          this.$router.push('/');
          return;
        case 'msg':
          this.$router.push('/msg');
          return;
        default:
          this.$router.push('/');
      }
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
