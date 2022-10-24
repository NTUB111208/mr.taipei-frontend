import liff from '../tools/liff'
;(async function () {
  await liff.init()
  let user = await liff.getBackendAuthStatus()
  if (user) {
    window.$nuxt.$store.commit('auth/setUser', user)
  } else {
    if (await liff.checkLogin()) {
      await liff.authWithBackend()
    }
  }
})()
