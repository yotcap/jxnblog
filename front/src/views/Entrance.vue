<template>
  <div id="app">
    <JXHeader></JXHeader>
    <div class="boxer">
      <Row class="container">
        <Col :xs="{ span: 0 }" :lg="{ span: 6 }">
          <JXSider></JXSider>
        </Col>
        <Col :xs="{ span: 22, offset: 1 }" :lg="{ span: 17, offset: 1 }">
          <section>
            <router-view/>
          </section>
        </Col>
      </Row>
    </div>
    <JXFooter></JXFooter>
    <BackTop />
  </div>
</template>
<script>
import JXHeader from '@/components/JXHeader';
import JXSider from '@/components/JXSider';
import JXFooter from '@/components/JXFooter';

export default {
  name: 'Entrance',
  components: {
    JXHeader,
    JXSider,
    JXFooter,
  },
};
</script>
<style scoped>
.boxer {
  padding-top: 3rem;
}
</style>
