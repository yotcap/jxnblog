<template>
  <div>
    <nav>
      <!-- start: category -->
      <div class="nav-boxer">
        <p>文章分类</p>
        <div class="underline"></div>
        <router-link 
          tag="a"
          v-for="item in dataCategoryList"
          :key="item.name"
          :to="'/blog?cate='+item.name">
          {{item.name}}&nbsp;({{item.total}})
        </router-link>
      </div>
      <!-- end: category -->
      <!-- start: date -->
      <div class="nav-boxer">
        <p>存档</p>
        <div class="underline"></div>
        <!-- <a v-for="item in dataDateList" :key="item.date">{{item.date}}&nbsp;({{item.total}})</a> -->
        <router-link
          tag="a"
          v-for="item in dataDateList"
          :key="item.date"
          :to="'/blog?date='+item.date">
          {{item.date}}&nbsp;({{item.total}})
        </router-link>
      </div>
      <!-- end: date -->
      <div class="nav-boxer">
        <p>About</p>
        <div class="underline"></div>
        <div>
          <p>JXN</p>
          <p>FE Artist</p>
        </div>
      </div>
    </nav>
    <!-- start: Drawer -->
    <Drawer
      title="JXN Blog"
      width="180"
      class="drawer-boxer"
      v-model="flagDrawer"
      :before-close="handleCloseDrawer">
      <p @click="handleTo('blog')">首页</p>
      <p @click="handleTo('msg')">留言板</p>
    </Drawer>
    <!-- end: Drawer -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
import Axios from '@/lib/axios.js';

@Component
export default class JXSider extends Vue {
  @State flagShowDrawer: boolean;
  @Mutation handleDrawerShow: any;
  dataCategoryList: [] = [];
  dataDateList: [] = [];
  get flagDrawer () {
    return this.flagShowDrawer;
  }
  beforeMount () {
    // this.geCategoryList();
    this.getOrderList('category');
    this.getOrderList('createTime');
  }
  geCategoryList (): void {
    Axios({
      url: '/article/getCategoryList',
    }).then((res: any) => {
      console.log(res, 'get-category-list');
      this.dataCategoryList = res.data;
    });
  }
  getOrderList (type: string) {
    Axios({
      url: '/article/getOrderList',
      params: {
        type,
      },
    }).then((res: any) => {
      console.log(res, `get-${type}-list`);
      switch (type) {
        case 'category':
          this.dataCategoryList = res.data;
          break;
        case 'createTime':
          this.dataDateList = res.data;
          break;
        default:
          console.log('durkdurkdurk');
      }
    });
  }
  handleTo (opt) {
    this.$router.push(`/${opt}`);
    this.handleDrawerShow(false);
  }
  handleCloseDrawer () {
    const that = this;
    return new Promise(function (res, rej) {
      that.handleDrawerShow(false);
      rej('prevent default close, please ignore!!');
    });
  }
}
</script>
<style scoped lang="less">
@import '~@/css/common.less';

nav {
  > div:not(:first-child) {
    .main-mt;
  }
  .nav-boxer {
    .main-pa;
    width: 100%;
    border: 0.0625rem solid @color-border-nav;
    border-radius: 0.125rem;
    box-shadow: 0.0625rem 0.0625rem 0.25rem  rgba(65, 65, 65, 0.3);
    background: @color-bg-nav;
    > p {
      font-weight: bold;
    }
    > a {
      display: table;
    }
    .underline {
      margin: 0.375rem 0;
    }
  }
}

.drawer-boxer .ivu-drawer-body {
  padding-left: 0;
  padding-right: 0;
  p {
    margin: .2rem 0;
    padding: .5rem;
    // border-radius: 4px;
    background-color: #eee;
  }
}
</style>
