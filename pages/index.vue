<template>
  <div class="menu">
    <div class="title">MR.Taipei</div>
    <Button @click="lineLogin"> LINE Login </Button>
    <Button color="lightgray" @click="$router.push('/navigation')">
      跳過不進行登入
    </Button>
  </div>
</template>

<script>
import liff from '~/tools/liff'

export default {
  name: 'IndexPage',
  async mounted() {
    await liff.getBackendAuthStatus()

    if (this.$store.state.auth.user) {
      this.$router.push('/navigation')
    }
  },
  methods: {
    async lineLogin() {
      liff.login()
    },
  },
}
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}
.menu > * {
  margin-top: 1rem;
  width: 100%;

  box-sizing: border-box;
}
.title {
  font-size: 2rem;
  text-align: center;
  color: white;
}
</style>
