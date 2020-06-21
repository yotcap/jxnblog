<template>
  <footer>
    <div class="container mt5 main-pt main-pb">
      <span>Powered By JXN</span>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'jx-footer',
};
</script>
<style scoped lang="less">
footer > div {
  display: flex;
  align-items: center;
  > a {
    margin-left: 2rem;
    > span {
      margin-left: .3rem;
    }
  }
}
</style>
