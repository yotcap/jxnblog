<template>
  <footer>
    <div class="container mt5 main-pt main-pb">
      <span>Powered By JXN</span>
      
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo">
        <img src="@/assets/beian.png"/>
        <span>鲁公网安备 37010202001856号</span>
      </a>
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
