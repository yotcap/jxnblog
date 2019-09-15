<template>
  <div>
    article-detail page<br>
    article-detail page
    <div id="toc">toctoc</div>
    <vue-markdown
      class="line-numbers language-markup"
      :watches="['toc']"
      :toc="flagToc"
      toc-id="toc"
      :source="ss">
    </vue-markdown>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';
import Prism from 'prismjs';

@Component({
  components: {
    VueMarkdown,
  },
})
export default class ArticleDetail extends Vue {
  private artId: string = '';
  private flagToc: boolean = true;   // 是否启用toc
  private ss: string =  `
  # title1
  ## title2
  ### title3
  #### title4
  ---
  >这是引用
  ---
  姓名|技能|排行
  --|:--:|--:
  刘备|哭|大哥
  关羽|打|二哥
  张飞|骂|三弟
  ---
  \`code\`
  \`\`\` javascript
    function f1 () {
      return 'ok';
    }
    console.log(123);
  \`\`\`
  \`\`\` css
    .c1 {
      font-size: 16px;
    }
  \`\`\`

  `;
  private beforeMount () {
    // this.artId = this.$route.query.id
    const id = this.$route.path.split('/')[2];
    // console.log(id);
  }
  private mounted () {
    this.flagToc = true;
    Prism.highlightAll();
  }
}
</script>
<style scoped>

</style>
