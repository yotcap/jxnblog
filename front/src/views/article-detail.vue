<template>
  <div>
    <p class="title">{{dataDetail.title}}</p>
    <div class="sub-info sub-title">
      <span>{{handleTimeFormatter(dataDetail.createTime)}}</span>
      <span>阅读数&nbsp;{{dataDetail.readingNum}}</span>
    </div>
    <div class="underline mt-3 mb-8"></div>
    <!-- <div id="toc">toctoc</div> -->
    <vue-markdown
      class="line-numbers language-markup"
      :watches="['toc']"
      :toc="flagToc"
      toc-id="toc"
      :source="dataSource">
    </vue-markdown>
    <div class="underline mt5"></div>
    <div class="footer-info mt1">
      <span class="sub-info">文章分类：</span>
      <router-link tag="a" :to="'/blog?cate='+dataDetail.category">{{dataDetail.category}}</router-link><br />
      <div class="mt-8" v-if="dataDetail.tags && dataDetail.tags.length">
        <span class="sub-info">标签：</span>
        <Tag v-for="item in dataDetail.tags" :key="item" :data="item" />
      </div>
    </div>
    <div class="underline mt1 mb2"></div>
    <p class="sub-title">留言</p>
    <com-bod class="mt1 mb2" :data="dataCom" />
    <div class="underline mt1 mb2"></div>
    <p class="sub-title">留下您的评论</p>
    <msg-bod class="mt2" ref="msgBod" @postMsg="handlePostMsg" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from '@/lib/axios.js';
import VueMarkdown from 'vue-markdown';
import Prism from 'prismjs';
import MsgBod from '@/components/MsgBod.vue';
import ComBod from '@/components/CommentsBod.vue';
import Tag from '@/components/Tag.vue';
import { __timeFormatter } from '@/lib/utils';

@Component({
  components: {
    VueMarkdown,
    MsgBod,
    Tag,
    ComBod,
  },
})
export default class ArticleDetail extends Vue {
  private artId: string = '';
  private flagToc: boolean = false;   // 是否启用toc
  private dataDetail: object = {};
  private dataSource: string = '';
  private dataCom: [] = [];   // 留言
  beforeMount () {
    this.artId = this.$route.path.split('/')[2];
    this.getData(this.artId);
    this.getDataCom();
  }
  mounted () {
    // this.flagToc = true;
    Prism.highlightAll();
  }
  getData (id: string) {
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
        // this.flagToc = true;
        Prism.highlightAll();
      }, 0);
    });
  }
  getDataCom () {
    Axios({
      url: '/comments/get',
      params: {
        artID: this.artId,
      },
    }).then((res: any) => {
      console.log(res, 'get-comments-list-art');
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
        artID: this.artId,
        val: params,
      },
    }).then((res: any) => {
      console.log(res, 'save-commonts-art');
      if (res.code === 1000) {
        this.$Message.success({
          content: '评论成功！',
          duration: 2,
        });
        this.getDataCom();
        (this.$refs.msgBod as any).handleResetForm();
      }
    });
  }
  handleTimeFormatter (t: any) {
    return __timeFormatter(t, '-');
  }
}
</script>
<style scoped lang="less">
.mt-3 { margin-top: .3rem; }
.mt-8 { margin-top: .8rem; }
.mb-8 { margin-bottom: .8rem; }
.title {
  font-size: 1.5rem;
  font-weight: 500;
}
.sub-title {
  font-size: 0.875rem;
  :nth-child(2) {
    margin-left: 3.75rem;
  }
}
.footer-info {
  font-size: 0.875rem;
}
</style>
