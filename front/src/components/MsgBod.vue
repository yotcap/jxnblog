<template>
  <div>
    <Form ref="formMsg" class="boxer" :label-width="80" label-position="right" :model="valForm" :rules="rulesForm">
      <FormItem prop="user" label="用户名">
        <Input class="input-short" clearable v-model="valForm.user" />
      </FormItem>
      <FormItem prop="email" label="邮箱">
        <Input type="email" class="input-short" clearable v-model="valForm.email" />
      </FormItem>
      <FormItem prop="content" label="内容">
        <Input
          v-model="valForm.content"
          type="textarea"
          :autosize="{minRows: 5, maxRows: 15}"
          placeholder="Enter something..." />
      </FormItem>
      <FormItem>
        <Button @click="handleSubmit('formMsg')">发表</Button>
      </FormItem>
    </Form>


  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from '@/lib/axios.js';

const validateUser = (rule: any, value: string, callback: any) => {
  // if (value === '') {
  //   callback(new Error('请输入昵称'));
  // } else if (value.length < 2) {
  //   callback(new Error('用户名长度必须大于2'));
  // } else {
  //   callback();
  // }
  if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/gi.test(value)) {
    callback(new Error('只能为2至10位不包含特殊字符'));
  } else {
    callback();
  }
};

@Component
export default class MsgBod extends Vue {
  artID: string = '';
  valEmail: string = '';
  valName: string = '';
  valForm: object = {
    user: '',
    email: '',
    content: '',
  };
  rulesForm: object = {
    user: [
      { required: true, message: '请输入昵称', trigger: 'blur' },
      { type: 'string', min: 2, max: 10, message: '用户名长度必须大于2', trigger: 'blur' },
      { required: true, validator: validateUser, trigger: 'blur' },
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
    ],
    content: [
      { required: true, message: '请输入评论内容', trigger: 'blur' },
      { type: 'string', min: 6, message: '不得少于6个字符', trigger: 'blur'},
    ],
  };
  beforeMount () {
    if (this.$route.name === 'article-detail') this.artID = this.$route.params.id;
  }
  handleSubmit (name: string) {
    (this.$refs[name] as any).validate((valid: boolean) => {
      if (valid) {
        this.$emit('postMsg', this.valForm);
      }
    });
  }
  handleResetForm () {
    (this.$refs.formMsg as any).resetFields();
  }
}
</script>
<style scoped lang="less">
.boxer {
  max-width: 500px;
  .input-short {
    width: 200px;
  }
}
</style>
