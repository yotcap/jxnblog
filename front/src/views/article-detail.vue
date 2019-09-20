<template>
  <div>
    <p class="title">{{dataDetail.title}}</p>
    <div class="underline mt-8 mb-8"></div>
    <!-- <div id="toc">toctoc</div> -->
    <vue-markdown
      class="line-numbers language-markup"
      :watches="['toc']"
      :toc="flagToc"
      toc-id="toc"
      :source="dataSource">
    </vue-markdown>
    <div class="underline mt5 mb2"></div>
    <p class="msg-title">留下您的评论</p>
    <msg-bod class="mt2"></msg-bod>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from '@/lib/axios.js';
import VueMarkdown from 'vue-markdown';
import Prism from 'prismjs';
import MsgBod from '@/components/MsgBod.vue';

@Component({
  components: {
    VueMarkdown,
    MsgBod,
  },
})
export default class ArticleDetail extends Vue {
  private artId: string = '';
  private flagToc: boolean = false;   // 是否启用toc
  private dataDetail: object = {};
  private dataSource: string = '';
  private beforeMount () {
    // this.artId = this.$route.query.id
    const id = this.$route.path.split('/')[2];
    this.getData(id);
  }
  private mounted () {
    this.flagToc = true;
    Prism.highlightAll();
  }
  private getData (id: string) {
    Axios({
      url: '/article/getDetail',
      params: {
        articleID: id,
      },
    }).then((res: any) => {
      console.log(res, 'get-articles-detail');
      this.dataSource = res.data.content;
      this.dataDetail = res.data;
      setTimeout(() => {
        this.flagToc = true;
        Prism.highlightAll();
      }, 0);
    });
  }
}
</script>
<style scoped lang="less">
.mt-8 {
  margin-top: .8rem;
}
.mb-8 {
  margin-bottom: .8rem;
}
.title {
  font-size: 1.5rem;
  font-weight: 500;
}
.msg-title {
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
