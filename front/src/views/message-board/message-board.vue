<template>
  <div>
    <com-bod class="mt2" :data="dataCom" />
    <div class="underline mt3 mb2"></div>
    <p class="sub-title">坐下来喝两杯？</p>
    <msg-bod class="mt2" ref="msgBod" @postMsg="handlePostMsg" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Axios from '@/lib/axios.js';
import ComBod from '@/components/CommentsBod.vue';
import MsgBod from '@/components/MsgBod.vue';

@Component({
  components: {
    ComBod,
    MsgBod,
  },
})
export default class MessageBoard extends Vue {
  dataCom: [] = [];
  beforeMount () {
    this.getData();
  }
  getData () {
    Axios({
      url: '/comments/get',
    }).then((res: any) => {
      console.log(res, 'get-msg-comments');
      if (res.code === 1000) {
        this.dataCom = res.data;
      }
    });
  }
  handlePostMsg (params: object) {
    Axios({
      url: '/comments/save',
      method: 'post',
      data: {
        val: params,
      },
    }).then((res: any) => {
      console.log(res, 'save-comments-msg');
      if (res.code === 1000) {
        this.$Message.success({
          content: '留言成功！',
          duration: 2,
        });
        this.getData();
        (this.$refs.msgBod as any).handleResetForm();
      }
    });
  }
}
</script>
<style scoped>

</style>
