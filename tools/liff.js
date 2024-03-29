const liff = require('@line/liff')
const config = require('../config.js').default
const axios = require('axios')

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
    return new Promise((r) => {
      let interval = setInterval(async () => {
        if (liff.isLoggedIn()) {
          let token = await liff.getIDToken()
          if (token) {
            clearInterval(interval)
            r(token)
          }
        } else {
          return null
        }
      }, 200)
    })
  },
  async authWithBackend() {
    return axios
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
    return axios
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
