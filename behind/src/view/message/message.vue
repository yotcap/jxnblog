<template>
  <div>
    <Table border ref="selection" :columns="columns" :data="dataMsg" />
    <Divider />
    <h2>所有留言</h2>
    <Table bordre :columns="columns" :data="dataMsgAll" />
  </div>
</template>
<script>
import { getDataUnreadComments, getDataAllComments, setIsRead, delComments } from '@/api/comments'
import { formatterTime } from '@/libs/util'

export default {
  name: 'message-board',
  data () {
    return {
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'name',
          key: 'name'
        },
        {
          title: 'content',
          key: 'content'
        },
        {
          title: 'email',
          key: 'email',
        },
        {
          title: 'from',
          key: 'articleID',
          render: (h, params) => {
            return h('a', {
              on: {
                click: () => {
                  if (params.row.articleID) {
                    // ...
                  }
                }
              }
            }, (function (params) {
              if (!params.row.articleID) return 'MSG'
              else return params.row.articleID
            })(params))
          }
        },
        {
          title: 'create-time',
          key: 'createTime',
          width: 150,
          render: (h, params) => {
            return h('span', {}, formatterTime(params.row.createTime))
          }
        },
        {
          title: 'Action',
          key: 'action',
          align: 'center',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: params.row.isRead?'none':''
                },
                on: {
                  click: () => {
                    this.handleRead(params.row)
                  }
                }
              }, '标为已读'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.handleDel(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      dataMsg: [],
      dataMsgAll: []
    }
  },
  beforeMount () {
    this.getData()
  },
  methods: {
    getData () {
      getDataUnreadComments().then(res => {
        console.log(res, 'get-comments-unread')
        this.dataMsg = res.data.data
      })
      getDataAllComments().then(res => {
        console.log(res, 'get-comments-all')
        this.dataMsgAll = res.data.data
      })
    },
    handleRead (row) {
      console.log(row)
      let params = {
        id: row._id,
        type: ''
      }
      if (row.articleID) params.type = 'comment'
      else params.type = 'msg'
      setIsRead(params).then(res => {
        const data = res.data
        console.log(data, 'set-is-read')
        if (data.code === 1000) {
          this.$Message.success('isRead success')
          this.getData()
        }
      })
    },
    handleDel (row) {
      let params = {
        id: row._id
      }
      if (row.articleID) params.type = 'comment'
      else params.type = 'msg'
      delComments(params).then(res => {
        const data = res.data
        console.log(data, 'del-comment')
        if (data.code === 1000) {
          this.$Message.success('del success')
          this.getData()
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
