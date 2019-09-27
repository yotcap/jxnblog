<template>
  <span>{{data}}</span>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Tag extends Vue {
  @Prop({
    type: String,
    default: '',
  })
  data: {};

}
</script>
<style scoped>
span {
  margin: 0 6px;
  padding: 2px 10px;
  border: 1px solid #bbb;
  border-radius:8px;
  cursor: pointer;
}
</style>
