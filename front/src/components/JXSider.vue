<template>
  <nav>
    <div class="nav-boxer">
      JXN
    </div>
    <div class="nav-boxer">
      JXN2
    </div>
    <div class="nav-boxer">
      JXN3
    </div>
  </nav>
</template>
<script>
export default {
  name: 'jxsider',
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
    background: @color-bg-nav;
  }
}

</style>
