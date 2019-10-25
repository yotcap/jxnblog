<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <!-- <Button @click="handleAdduser">Add a super</Button> -->
    <div class="login-con">
      <Card icon="log-in" title="登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'handleAddUser'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    },
    handleAdduser () {
      this.handleAddUser({
        username: 'spadmin',
        pwd: '1'
      }).then(res => {
        if (res.code === 1000) {
          this.$Message.success({
            content: res.msg
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
