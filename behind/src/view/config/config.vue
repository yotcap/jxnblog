<template>
  <div>
    <Form :model="formItem" :label-width="80">
      <FormItem label="评论留言">
        <i-switch v-model="formItem.flagComment" size="large" @on-change="handleSwitchComment">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </FormItem>
      <Divider />
      <h1>页面显示</h1>
      <FormItem label="文章分类">
        <i-switch v-model="formItem.isCategory" size="large" @on-change="handleSwitchIsCategory">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </FormItem>
      <FormItem label="文章归档">
        <i-switch v-model="formItem.isCreateTime" size="large" @on-change="handleSwitchIsCreateTime">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </FormItem>
      <FormItem label="关于">
        <i-switch v-model="formItem.isAbout" size="large" @on-change="handleSwitchIsAbout">
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
        flagComment: true,
        isCategory: true,   // 是否显示文章分类
        isCreateTime: true,    // 是否显示文章归档
        isAbout: true,  // About
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
          this.formItem.isCategory = data.isCategory
          this.formItem.isCreateTime = data.isCreateTime
          this.formItem.isAbout = data.isAbout
        }
      })
    },
    handleSwitchComment (val) {
      saveConfig({
        flagComment: val
      }).then(res => {
        console.log(res, 'save-config-comment')
      })
    },
    // 是否显示文章分类
    handleSwitchIsCategory (val) {
      saveConfig({ isCategory: val }).then(res => {
        console.log(res, 'save-sonfig-show-category')
      })
    },
    // 是否显示文章按时间归档
    handleSwitchIsCreateTime (val) {
      saveConfig({ isCreateTime: val }).then(res => {
        console.log(res, 'save-config-show-createtime')
      })
    },
    // 是否显示About
    handleSwitchIsAbout (val) {
      saveConfig({ isAbout: val }).then(res => {
        console.log(res, 'save-config-show-about')
      })
    }
  }
}
</script>
<style scoped>

</style>
