<template>
  <div>
    <nav>
      <div class="nav-boxer">
        <p>文章分类</p>
        <div class="underline"></div>
        <a>JS</a>
        <a>TS</a>
        <a>CSS</a>
      </div>
      <div class="nav-boxer">
        <p>存档</p>
        <div class="underline"></div>
        <a>2019.08 (2)</a>
      </div>
      <div class="nav-boxer">
        <p>About</p>
        <div class="underline"></div>
        <span>JXN</span>
      </div>
    </nav>
    <!-- start: Drawer -->
    <Drawer
      title="JXN Blog"
      width="180"
      v-model="flagDrawer"
      :before-close="handleCloseDrawer">
      <p>contents</p>
      <p>contents</p>
    </Drawer>
    <!-- end: Drawer -->
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'jx-sider',
  data () {
    return {
      // flagDrawer: false,
    };
  },
  computed: {
    flagDrawer () {
      return this.flagShowDrawer;
    },
    ...mapState([
      'flagShowDrawer',
    ]),
  },
  beforeMount () {
    // this.flagDrawer = this.flagShowDrawer;
  },
  methods: {
    handleCloseDrawer () {
      const that = this;
      return new Promise(function (res, rej) {
        that.handleDrawerShow(false);
        rej('prevent default close, please ignore!!');
      });
    },
    ...mapMutations([
      'handleDrawerShow',
    ]),
  },
};
</script>
<style scoped lang="less">
@import '~@/css/common.less';

nav {
  > div:not(:first-child) {
    .main-mt;
  }
  .nav-boxer {
    .main-pa;
    width: 100%;
    border: 1px solid @color-border-nav;
    border-radius: 2px;
    box-shadow: 1px 1px 4px  rgba(65, 65, 65, 0.3);;
    background: @color-bg-nav;
    > p {
      font-weight: bold;
    }
    > a {
      display: table;
    }
    .underline {
      margin: 6px 0 6px;
    }
  }
}

</style>
