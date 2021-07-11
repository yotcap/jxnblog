<template>
  <div>
    <h1>试剂管理 app store</h1>
    <upload-model type="appstore" />
  </div>
</template>
<script>
import UploadModel from '_c/upload-model/upload-model.vue'

export default {
  name: 'appstore',
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
