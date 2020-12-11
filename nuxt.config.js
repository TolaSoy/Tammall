export default {

  mode: "universal",
  router: {
    base: "/",
    linkExactActiveClass: "kv-active-link",
    linkActiveClass: "kv-active",
    middleware: ["authenticated"]
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "Tammall - %s",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    script: [
      {
        src: "https://code.jquery.com/jquery-3.5.1.slim.min.js",
        integrity:
          "sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj",
        crossorigin: "anonymous"
      },
      {
        src:
          "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",
        integrity:
          "sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN",
        crossorigin: "anonymous"
      },
      {
        src:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js",
        integrity:
          "sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV",
        crossorigin: "anonymous"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#0183D9",
    height: "5px",
    duration: 3000,
    continuous: true
  },

  /*
   ** Global CSS
   */
  css: ["@/assets/scss/app.scss", "@/assets/fontawesome/css/all.min.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~plugins/helper.js", { src: "~/plugins/ck-editor.js" }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/svg", "@nuxtjs/color-mode"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    [
      "vue-sweetalert2/nuxt",
      {
        confirmButtonColor: "#41b882",
        cancelButtonColor: "#ff7674"
      }
    ],
    'nuxt-vuex-localstorage'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
