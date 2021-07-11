<template>
  <div>
    <Upload
      ref="upload"
      :action="uploadUrl"
      :before-upload="handleBeforeUpload"
      :data="uploadParams"
      :max-size="$config.maxFileSize"
    >
      <Button icon="ios-cloud-upload-outline" :loading="uploadLoading">上传文件</Button>
    </Upload>
    <!-- <Button type="primary" @click="handleUploadFile">点击上传文件</Button> -->
  </div>
</template>
<script>
import config from '@/config'

export default {
  name: 'upload-model',
  props: {
    type: String
  },
  data () {
    return {
      uploadParams: {},
      file: [],
      uploadLoading: false,
      uploadUrl: process.env.NODE_ENV === 'development' ? config.uploadUrl.dev : config.uploadUrl.pro
    }
  },
  methods: {
    handleBeforeUpload (file) {
      if (this.type === 'flowers') {
        this.uploadParams = {
          type: 'flowers'
        }
      } else if (this.type === 'appstore') {
        this.uploadParams = {
          type: 'reagentapp'
        }
      }

      return new Promise(resolve => {
        this.$nextTick(() => resolve(true))
      })
      // return res
    },
    handleUploadFile () {
      this.$refs.upload.clearFiles()
    }
  }
}
</script>
<style scoped lang="less">

</style>
