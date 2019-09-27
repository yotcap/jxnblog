<template>
  <div class="boxer-404">
    <h2>Oooooops, 页面未找到（404）</h2>
    <Button @click="backHome">返回首页（{{timeCountDown}}）</Button>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Error404 extends Vue {
  timeCountDown: number = 7;
  timer: number = 0;
  beforeMount () {
    this.handleTimeDown();
  }
  backHome () {
    this.$router.push('/');
  }
  handleTimeDown () {
    if (this.timeCountDown < 1) {
      this.backHome();
      return;
    }
    this.timeCountDown--;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.handleTimeDown();
    }, 1000);
  }
}
</script>
<style scoped>
.boxer-404 {
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
