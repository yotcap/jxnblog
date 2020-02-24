<template>
  <div>
    <h1>百花齊放，百家爭鳴！</h1>
    <upload-model type="flowers" />
  </div>
</template>
<script>
import UploadModel from '_c/upload-model/upload-model.vue'

export default {
  name: 'flowers',
  components: {
    UploadModel
  }
}
</script>
<style scoped lang="less">
h1 {
  margin-bottom: 2rem;
}
</style>
