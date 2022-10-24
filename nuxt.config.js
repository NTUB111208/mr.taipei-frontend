import config from './config'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'MR.Taipei',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${config.map.key}`,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
    'normalize.css/normalize.css',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/snackbar.js', `~/plugins/liff.js`],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ['~/components/Elements'],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules

  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    'nuxt-leaflet',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    proxy: true,
  },

  proxy: {
    '/api': 'http://127.0.0.1:8001',
    '/objectDetection': 'https://ntub.fr.rs',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'zh-tw',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    https: {
      key: `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA1J87K9y47lWuKCiFcsCGph2I1Rk4A1uJHMrndkWrGciRgRDn
CroMG4K9RsXCXlAERzLLli1Sp0mGOgKUWibyzlMoyaLmQE14h5uvhdUWu46a+Ydd
sxH0bZi5I6YMmC8sihOauAm183GVYIMGYbOOGyxJe9/SJXzjCl6EtQtzwVBtm3CM
RdH9tvCpvMLh+ljVi5PeiJJaxchdOypS2G9SL+xDuOZNnoLWMmDKyD26n8XUiHuP
vqRVR3v2R2FaAJz8iUgMXADvH0ch8Vf0aCB6VDKRUZsM6ZJHst+bcsAH2UpDLqIX
vTQecJ/5RfRuoxvBAymnArA/Ai8BwidSdBv8LQIDAQABAoIBAGMT7BPNX9OX03bd
IwpNErGXs6pxfPt7jRIArwka/9cc8kitYqxJ89hh/Odcwe0G5mdzERFi/0/63/Rq
PU0hNyXT9H65TQgL0a2Ha6w2lshBdI/wd0Y5iKgFcchd2SKVYPDan89AnyvY8t2t
UKz4abDZ20hBDQDxCC9NyhM/Sep7QKtSopX8KS9Q2fUtBizKE3aYXxmgVHfH6R0u
juaLmhKAieFK65XvDcueFfi9vFV4v/vRSuWwa3mCNZUos91685Q/xJ4klcWOn1k8
Z2WD7EMSKxdgx5B9nNXQoLag2TYmWs5pA4aEiYGz9U4KT1yK0c8tmsqdQQtqNHCB
5O4zbQECgYEA/+AItMNYBdWG1sOGMiBEbhDnVyab3SKavNgD5gIkDWGy05v2VO3f
bP+hKakqFzP/DJAqq2gEgDtyu46sh711hxlk6sHjaUWaGXuwT5cdGKWT0DKfDw1a
vlHRDmciyUvYFUJ9GZp10XNR60zNpGL4FULezwOiuFhwV8mLWxibcUECgYEA1LnL
KT6R8yg0hkNXKj2/iRAqGKFQ3Tdfi+hURQKIqJ4nF+UI4KZJ5wi39EmwRNhqd323
YasreoftTkZ7H3LroXhGgnLIKYwD2oxw8PUZINM1BY+3XwODf4adrnk41mFj2oqc
7uqnbrYOZWeynm9u4tnOT2xSPfiKUKfWwk1oY+0CgYEA/DeBXW0QXu/TMe8ZYF+e
FEBlSOqtyJRLosnrTdXeY7Jh62RYs+6lxXNVERPGgYinZ2LULJEjnqL6vRYtyr9e
EgVeDGmCGEqbU3Mwn8N80sajpR3A2712LRPI1kGjcHhqTspzNcGjUQozPZU/P0Ku
94YqyjPzOXMzidUIoIro7gECgYEAqw7sS7JA8uM1uXGVOiaFStZww3WU7Q6GCp88
hHHRKqZikVhflyag7uOX6R0IXZQZqRSyzhsyz0lWjkcm4tcqm6F4MZXTV3V789ZT
S7AMENVGIb67me/dYkMBsTdReTK/dRFZuNWA5goH8Ys9myHIbSrwN/XG/IZL0yfk
DkLo2tECgYEApZnTIcrUYqyOCvI9CKmX4b6G+JorRc/YAqN1+LSHsPCp6rJJKy/l
oE4J0D4+mqxbYu+KXkmW+RdWCMv6EE9AD8cf0W2WZVgaROM0aTfR6rEOFUeVKKv3
bOSPYi1iw/lxKQmAZNjzk1aKBk6TnSCLuif9X6NVyoLAsuAtoiEQRKw=
-----END RSA PRIVATE KEY-----`,
      cert: `-----BEGIN CERTIFICATE-----
MIIDKDCCAhACCQDxRSwzl4SYnTANBgkqhkiG9w0BAQsFADBWMQswCQYDVQQGEwJU
VzELMAkGA1UECAwCVFcxCzAJBgNVBAcMAlRXMQswCQYDVQQKDAJUVzELMAkGA1UE
CwwCVFcxEzARBgNVBAMMCm50dWIubG9jYWwwHhcNMjIxMDIzMjAxNjI5WhcNMjMx
MDIzMjAxNjI5WjBWMQswCQYDVQQGEwJUVzELMAkGA1UECAwCVFcxCzAJBgNVBAcM
AlRXMQswCQYDVQQKDAJUVzELMAkGA1UECwwCVFcxEzARBgNVBAMMCm50dWIubG9j
YWwwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDUnzsr3LjuVa4oKIVy
wIamHYjVGTgDW4kcyud2RasZyJGBEOcKugwbgr1GxcJeUARHMsuWLVKnSYY6ApRa
JvLOUyjJouZATXiHm6+F1Ra7jpr5h12zEfRtmLkjpgyYLyyKE5q4CbXzcZVggwZh
s44bLEl739IlfOMKXoS1C3PBUG2bcIxF0f228Km8wuH6WNWLk96IklrFyF07KlLY
b1Iv7EO45k2egtYyYMrIPbqfxdSIe4++pFVHe/ZHYVoAnPyJSAxcAO8fRyHxV/Ro
IHpUMpFRmwzpkkey35tywAfZSkMuohe9NB5wn/lF9G6jG8EDKacCsD8CLwHCJ1J0
G/wtAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAC39ftuw8O0tS/QtoxRObHL68kLx
qN+kromL4tWEOa5/yyc6ZrVtOzd25IXeI2IKI97YqHbZdBpgp5zGmyJBHXDKdm4t
KAeI1iLc2YsbzRI/RDa6UA5iU8SRwWAgSCLxsDcDIlUs1lfG8Fo4Zy5S2ecNcwbi
87QrtdYw75Hqgr8BaJBJyt+l2mkn0RTdrPIthdJW+57FpTe83bquEDjM7QRG9ssj
NvErsbADWwS5UreZ+13WtAMEr12rt8dqQ2cxvM3q2rHDg1+zM3gkk/1gOGZmoTOo
Px1+ZKLI8QePeoXSp5gqz8AefMvdLYNLgLGUrSpVJJQoxUZV/kpsHm3sh5o=
-----END CERTIFICATE-----`,
    },
  },
}
