<template>
  <div>
    <Form :model="formItem" :label-width="80">
      <FormItem label="评论留言">
        <i-switch v-model="formItem.flagComment" size="large" @on-change="handleSwitchComment">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { getDataConfig, saveConfig } from '@/api/config'

export default {
  name: 'config',
  data () {
    return {
      formItem: {
        flagComment: true
      }
      // flagComment: true
    }
  },
  beforeMount () {
    this.getData()
  },
  methods: {
    getData () {
      getDataConfig().then(res => {
        console.log(res, 'get-config-data')
        const data = res.data.data
        if (res.data.code === 1000) {
          this.formItem.flagComment = data.flagComment
        }
      })
    },
    handleSwitchComment (val) {
      saveConfig({
        flagComment: val
      }).then(res => {
        console.log(res, 'save-config-comment')
      })
    }
  }
}
</script>
<style scoped>

</style>
