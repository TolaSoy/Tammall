import {mapState, mapActions, mapGetters} from "vuex";
import loadingSpin from "~/mixins/loadingSpin";

export default {
  mixins: [loadingSpin],
  head() {
    return {
      titleTemplate: "List Products - Tammall"
    };
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("product", ["products"]),
    ...mapGetters("users", ["getUserStoreId"])
  },
  methods: {
    ...mapActions("product", [
      "getProducts",
      "deleteProduct",
      "toggleStatus",
      "addProduct",
      "setStoreId"
    ]),
    del(id) {
      let dataId = {
        id: id,
        storeId:this.getUserStoreId
      };
      this.$swal({
        title: "Are you sure this product?",
        text: "You will not able to restore it!",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(willDelete => {
        if (willDelete.isConfirmed) {
          this.$nextTick(() => {
            this.startLoading();
            this.$store
              .dispatch("product/deleteProduct", dataId)
              .then(() => {
                this.getProducts(this.getUserStoreId);
              })
              .then(() => {
                this.finishLoading();
                this.$swal({
                  title: "You, deleted successfully",
                  icon: "success"
                });
              });
          });
        }
      });
    },
    toggle(id, status) {
      let payload = {
        id,
        status
      };
      this.$store.dispatch("product/toggleStatus", payload).then(() => {
        this.getProducts(this.getUserStoreId);
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setStoreId(this.getUserStoreId);
      this.startLoading();
      this.getProducts(this.getUserStoreId).then(() => {
        this.finishLoading();
      });
    });
  }
};
