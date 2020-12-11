import { mapState, mapActions } from "vuex";
import loadingSpin from "~/mixins/loadingSpin";

export default {
  mixins: [loadingSpin],
  head() {
    return {
      titleTemplate: "List Store - Tammall"
    };
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("store", ["stores"])
  },
  methods: {
    ...mapActions("store", [
      "getStores",
      "deleteStore",
      "toggleStatus",
      "addStore"
    ]),
    del(id) {
      this.$swal({
        title: "Are you sure this Store?",
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
              .dispatch("store/deleteStore", id)
              .then(() => {
                this.getStores();
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
      this.$store.dispatch("store/toggleStatus", payload).then(() => {
        this.getStores();
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.startLoading();
      this.getStores().then(() => {
        this.finishLoading();
      });
    });
  }
};
