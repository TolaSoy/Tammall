import { mapState, mapActions } from "vuex";
import loadingSpin from "~/mixins/loadingSpin";

export default {
  mixins: [loadingSpin],
  head() {
    return {
      titleTemplate: "Home - Tammall"
    };
  },
  data() {
    return {
      totalProducts: ""
    };
  },
  computed: {
    ...mapState("product", ["products"])
  },
  methods: {
    getTotalProducts() {
      this.$nextTick(() => {
        this.startLoading();
        this.$store.dispatch("product/getProducts").then(() => {
          this.totalProducts = this.products.length;
          this.finishLoading();
        });
      });
    }
  },
  mounted() {
    this.getTotalProducts();
  }
};
