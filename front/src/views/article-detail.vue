<template>
  <div>
    <p class="title">{{dataDetail.title}}</p>
    <div class="underline"></div>
    <!-- <div id="toc">toctoc</div> -->
    <vue-markdown
      class="line-numbers language-markup"
      :watches="['toc']"
      :toc="flagToc"
      toc-id="toc"
      :source="dataSource">
    </vue-markdown>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from '@/lib/axios.js';
import VueMarkdown from 'vue-markdown';
import Prism from 'prismjs';

@Component({
  components: {
    VueMarkdown,
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
.title {
  font-size: 1.5rem;
  font-weight: 500;
}
.underline {
  margin: .8rem 0;
}
</style>
