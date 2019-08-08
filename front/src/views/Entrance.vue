<template>
  <Layout id="app">
    <JXHeader></JXHeader>
    <Layout>
      <Sider></Sider>
      <Content>
        <router-view/>
      </Content>
    </Layout>
    <Footer>footer</Footer>
  </Layout>
</template>
<script>
import JXHeader from '@/components/JXHeader.vue';
import Sider from '@/components/Sider';

export default {
  name: 'Entrance',
  components: {
    JXHeader,
    Sider,
  },
};
</script>
<style scoped>

</style>
