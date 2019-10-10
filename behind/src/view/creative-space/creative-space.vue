<template>
<!-- <div> -->
  <!-- <div class="mkd-boxer">
  </div> -->
<!-- <div id="container">
    <div ref="left" class="left">
      <div ref="lc" class="child"></div>
    </div>
    <div ref="right" class="right">
      <div ref="rc" class="child"></div>
    </div>
  </div>
</div> -->
<div>
  <Form ref="formValidate" label-position="right" :label-width="60" :model="artInfo" >
    <FormItem label="标题" prop="title">
      <Input class="input-large" v-model="artInfo.title" placeholder="输入标题" />
    </FormItem>
    <!-- <FormItem> -->
      <markdown-editor v-model="content" />
    <!-- </FormItem> -->
    <FormItem label="文章类型">
      <RadioGroup v-model="artInfo.type">
        <Radio label="original">原创</Radio>
        <Radio label="reference">转载</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="文章分类">
      <Select class="input-small" v-model="category" filterable>
        <Option v-for="item in categoryList" :value="item.name?item.name:'---'" :key="item.value">{{ item.name?item.name:'---' }}</Option>
      </Select>
      <span class="mlr1r">OR 新增分类</span>
      <Input class="input-small" v-model="cacheCategory" placeholder="新建分类" />
      <Button class="row-btn" @click="handleAddCategory">添加</Button>
    </FormItem>
    <FormItem label="文章标签">
      <Input class="input-small" v-model="cacheTag" placeholder="输入Tag" />
      <Button class="row-btn" @click="handleAddTag">添加</Button>
    </FormItem>
    <FormItem>
      <Tag v-for="item in arrTag" :key="item" :name="item" closable @on-close="handleCloseTag">{{item}}</Tag>
    </FormItem>
    <FormItem label="摘要">
      <Input class="input-large" v-model="artInfo.summary" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter summary..." />
    </FormItem>
    <Button type="primary" size="large" @click="toSubmit">发表</Button>
  </Form>
  <!-- start: Modal 确认发表 -->
  <Modal width="300" v-model="modalSubmit" draggable scrollable title="确认发表" @on-ok="confirmSubmit">
    <div>确认发表？</div>
  </Modal>
  <!-- end: Modal 确认发表 -->
</div>
</template>
<script>
import MarkdownEditor from '_c/markdown'
import { addArticle, getCategorylist } from '@/api/article'
import './creative-space.less'

export default {
  name: 'creative-space',
  data () {
    return {
      show: true,
      title: '',
      artInfo: {
        title: '',
        type: 'original',
        summary: ''
      },
      content: ``,
      cacheTag: '',
      cacheCategory: '',
      arrTag: [],
      categoryList: [],
      category: null,
      modalSubmit: false,
    }
  },
  mounted () {
    getCategorylist().then(res => {
      let data = res.data
      console.log(data, 'get-category-list')
      this.categoryList = data.data
    })
  },
  methods: {
    toSubmit () {
      if (!this.artInfo.title) {
        this.$Message.error('请输入标题')
        return
      }
      if (!this.content) {
        this.$Message.error('请输入内容')
        return
      }
      if (!this.category) {
        this.$Message.error('请选择文章分类')
        return
      }
      this.modalSubmit = true
    },
    confirmSubmit () {
      const art = {
        title: this.artInfo.title,
        content: this.content,
        tags: this.arrTag,
        category: this.category,
        summary:this.handleSummary(this.content)
      }
      addArticle(art).then(res => {
        const data = res.data
        console.log(data, 'add-article')
        if (data.code === 1000) {
          this.$Message.success('发表成功！')
          localStorage.removeItem('markdownContent')
          this.$router.push({
            name: this.$config.homeName
          })
        }
      })
    },
    // 新建分类
    handleAddCategory () {
      if (!this.cacheCategory) {
        this.$Message.error('Category内容不能为空')
        return
      }
      this.category = this.cacheCategory
    },
    // 添加标签
    handleAddTag () {
      if (!this.cacheTag) {
        this.$Message.error('Tag内容不能为空')
        return
      }
      this.arrTag.push(this.cacheTag)
      this.cacheTag = ''
    },
    // 处理摘要
    handleSummary (c) {
      if (this.artInfo.summary) return this.artInfo.summary
      let cacheSummary
      if (c.length > 200) {
        cacheSummary = c.slice(0, 199)
      } else {
        cacheSummary = c
      }
      cacheSummary = cacheSummary.replace('\`\`\`', '')
      cacheSummary = cacheSummary.replace('\`', '')
      cacheSummary = cacheSummary.replace('> ', '')
      cacheSummary = cacheSummary.replace('**', '')
      cacheSummary = cacheSummary.replace(/\#* /g, '')
      cacheSummary = cacheSummary.replace(/[\r\n]/g, '')
      cacheSummary = cacheSummary.replace('---', '')
      return cacheSummary
    },
    handleCloseTag (event, name) {
      const index = this.arrTag.indexOf(name)
      this.arrTag.splice(index, 1)
    },
    init2 () {
      // const left = this.$refs.left;
      // const right = this.$refs.right;
      // const rc = this.$refs.rc;
      // const lc = this.$refs.lc;
      // let s1 = '';
      // let s2 = '';
      // let currentTab = 0;
      // for (let i = 0; i < 500; i++) {
      //   s1 += 'mlkmklmmkjmk1232';
      //   s2 += 'njkmjkk';
      // }
      // lc.innerHTML = s1;
      // rc.innerHTML = s2;
    },
    init () {
      // const c=document.getElementById('container')
      // const l=document.querySelector('.left')
      // const r=document.querySelector('.right')
      // const lc=l.querySelector('.child')
      // const rc=r.querySelector('.child')
      // // 这段代码只是为了方便插入很多文本内容
      // let s1 = ''
      // let s2 = ''
      // let currentTab = 0
      // for(let i = 0; i < 500; i++){
      //   s1 += 'mlkmklmmkjmk1232'
      //   s2 += 'njkmjkk'
      // }
      // lc.innerHTML = s1
      // rc.innerHTML = s2
      // let scale = (rc.offsetHeight - r.offsetHeight) / (lc.offsetHeight - l.offsetHeight)
      // l.addEventListener('scroll', ()=>{
      //   if (currentTab !== 1) return
      //   r.scrollTop = l.scrollTop * scale
      // })
      // r.addEventListener('scroll', ()=>{
      //   if (currentTab !== 2) return
      //   l.scrollTop = r.scrollTop / scale
      // })
      // l.addEventListener('mouseover', ()=>{
      //   // 1 表示表示当前鼠标位于 .left元素范围内
      //   currentTab = 1
      // })
      // r.addEventListener('mouseover', ()=>{
      //   // 2 表示表示当前鼠标位于 .right元素范围内
      //     currentTab = 2
      // })
    }
  },
  components: {
    MarkdownEditor
  }
}
</script>
<style scoped lang="less">
.mkd-boxer {
  height: 100%;
  display: flex;
  textarea {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
  > div {
    width: 50%;
    padding: 8px;
  }
  .result {
    height: 100%;
    padding: 10px 20px;
    border: 1px solid #bbb;
    border-radius: 5px;
  }
}

#container {
  width: 100%;
  height: 300px;
  display: flex;
  border: 1px solid #bbb;
}
.left, .right {
  flex: 1;
  height: 100%;
  word-wrap: break-word;
  overflow-y: scroll;
}

.input-small {
  width: 12.5rem;
}
.input-large {
  max-width: 40rem;
}
</style>
