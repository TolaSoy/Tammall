export default {
  loading: {},
  methods: {
    startLoading() {
      this.$nuxt.$loading.start();
    },
    finishLoading() {
      this.$nuxt.$loading.finish();
    }
  }
};
