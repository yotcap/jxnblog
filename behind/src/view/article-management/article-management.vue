<template>
  <div>
    <Table border ref="selection" :columns="columns" :data="dataMsg" />
    <Page
      size="small"
      class-name="pagination"
      show-elevator
      show-total
      :current="currentPage"
      :total="totalNum"
      @on-change="handleChangePage" />
  </div>
</template>
<script>
import { getArticleList, delArticle } from '@/api/article'
import { formatterTime } from '@/libs/util'

export default {
  name: 'article-manager',
  data () {
    return {
      currentPage: 1,
      totalNum: 0,
      columns: [
        { type: 'selection', width: 60, align: 'center' },
        { title: 'articleID', key: 'articleID' },
        { title: 'title', key: 'title' },
        { title: 'category', key: 'category', width: 100 },
        { title: 'commentNum', key: 'commentNum', width: 80 },
        {
          title: 'createTime',
          key: 'createTime',
          widht: 150,
          render: (h, params) => {
            return h('span', {}, formatterTime(params.row.createTime))
          }
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: 'room',
                      query: {
                        artID: params.row.articleID
                      }
                    })
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '警告⚠️',
                      content: '确定删除吗？',
                      onOk: () => {
                        this.handleArtDel(params.row)
                      }
                    })
                  }
                }
              }, '删除')
            ], '')
          }
        }
      ],
      dataMsg: []
    }
  },
  beforeMount () {
    this.getData()
  },
  methods: {
    getData (params) {
      getArticleList(params).then(res => {
        const data = res.data
        console.log(data, 'get-article-list')
        if (data.code === 1000) {
          this.dataMsg = data.data.articleList
          this.totalNum = data.data.totalNum
          this.currentPage = data.data.page
        }
      })
    },
    handleArtDel (row) {
      delArticle({
        articleID: row.articleID
      }).then(res => {
        const data = res.data
        if (data.code === 1000) {
          this.$Message.success('删除文章成功')
          this.getData()
        }
      })
    },
    handleChangePage (val) {
      this.getData({
        page: val
      })
    }
  }
}
</script>
<style scoped lang="less">
.pagination {
  margin: 1rem 0 10rem;
}
</style>
