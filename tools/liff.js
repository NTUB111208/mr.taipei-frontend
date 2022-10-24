const liff = require('@line/liff')
const config = require('../config.js').default

export default {
  async init() {
    await liff.init({
      liffId: config.liff.liffID,
    })
  },
  async login() {
    await liff.login()
  },
  async checkLogin() {
    return liff.isLoggedIn()
  },
  async logout() {
    await liff.logout()
    await liff.disconnect()
  },
  async getUser() {
    return liff.getProfile()
  },
  async getAccessToken() {
    return liff.getAccessToken()
  },
  async getIDToken() {
    return liff.getIDToken()
  },
  async authWithBackend() {
    return window.$nuxt.$axios
      .post('/api/auth/login', {
        idToken: await this.getIDToken(),
      })
      .then((response) => {
        let user = response.data.user
        window.$nuxt.$store.commit('auth/setUser', user)
        setTimeout(liff.logout, 5000)
        return user
      })
      .catch((error) => {
        console.error('[User Login]', 'Login error.', error)
        return null
      })
  },
  async getBackendAuthStatus() {
    return window.$nuxt.$axios
      .get('/api/auth/status')
      .then((response) => {
        let user = response.data.user
        window.$nuxt.$store.commit('auth/setUser', user)
        return user
      })
      .catch((error) => {
        return null
      })
  },
}
