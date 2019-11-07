<template>
  <div id="app">
    <JXHeader></JXHeader>
    <div class="boxer">
      <Row class="container">
        <Col :xs="{ span: 0 }" :lg="{ span: 5 }">
          <JXSider></JXSider>
        </Col>
        <Col :xs="{ span: 22, offset: 1 }" :lg="{ span: 18, offset: 1 }">
          <section>
            <transition name="fade" mode="out-in">
              <router-view />
            </transition>
          </section>
        </Col>
      </Row>
    </div>
    <JXFooter></JXFooter>
    <BackTop />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Axios from '@/lib/axios.js';
import JXHeader from '@/components/JXHeader.vue';
import JXSider from '@/components/JXSider.vue';
import JXFooter from '@/components/JXFooter.vue';

@Component({
  components: {
    JXHeader,
    JXSider,
    JXFooter,
  },
})
export default class Entrance extends Vue {
  beforeMount () {
    this.handleAccess();
  }
  handleAccess () {
    Axios({
      url: '/statistics/access',
    }).then((res: any) => {
      console.log(res, 'access-statistics');
    });
  }
}
</script>
<style scoped>
.boxer {
  padding-top: 3rem;
}
</style>
