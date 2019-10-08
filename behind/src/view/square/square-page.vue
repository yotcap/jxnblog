<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="24" :md=12 :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Divider />
    <Row>
      <i-col>
        <Button class="btn-big" type="error" @click="toRoom">开始</Button>
      </i-col>
    </Row>
  </div>
</template>
<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { getVisitors } from '@/api/statistics'
import { getArticleList } from '@/api/article'

export default {
  name: 'square_page',
  data () {
    return {
      inforCardData: [
        { title: '总访问量', icon: 'md-person-add', count: 0, color: '#2d8cf0' },
        { title: '文章总数', icon: 'md-map', count: 0, color: '#9A66E4' }
        // { title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b' },
        // { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        // { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        // { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        // { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ]
    }
  },
  beforeMount () {
    getVisitors().then(res => {
      console.log(res, 'get-statistics')
      this.inforCardData[0].count = res.data.totleVisitor
    })
    getArticleList().then(res => {
      console.log(res, 'get-article-list')
      this.inforCardData[1].count = res.data.data.totalNum
    })
  },
  methods: {
    toRoom () {
      this.$router.push({
        name: 'room'
      })
    }
  },
  components: {
    InforCard,
    CountTo
  }
}
</script>
<style lang="less">
.count-style{
  font-size: 40px;
}
.btn-big {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
