<template>
  <div>
    <Upload :action="uploadUrl" :before-upload="handleBeforeUpload" accept="image/png, image/jpg" :max-size="$config.maxFileSize">
      <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传文件</Button>
    </Upload>
  </div>
</template>
<script>
import config from '@/config'

export default {
  name: 'upload-model',
  data () {
    return {
      uploadLoading: false,
      uploadUrl: process.env.NODE_ENV === 'development' ? config.uploadUrl.dev : config.uploadUrl.pro,
    }
  },
  methods: {
    handleBeforeUpload (file) {
      // console.log(file)
      // ...
    },
    handleUploadFile () {
      // ...
    }
  }
}
</script>
<style scoped lang="less">

</style>
