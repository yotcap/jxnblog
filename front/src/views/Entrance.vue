<template>
  <div id="app">
    <JXHeader></JXHeader>
    <div class="main-pt">
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
    <Footer>footer</Footer>
  </div>
</template>
<script>
import JXHeader from '@/components/JXHeader.vue';
import JXSider from '@/components/JXSider';
export default {
  name: 'Entrance',
  components: {
    JXHeader,
    JXSider,
  },
};
</script>
<style scoped>

</style>
