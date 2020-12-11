import { mapState, mapActions } from "vuex";
import loadingSpin from "~/mixins/loadingSpin";

export default {
  mixins: [loadingSpin],
  data() {
    return {};
  },
  head() {
    return {
      titleTemplate: "List Categories - Tammall"
    };
  },
  computed: {
    ...mapState("category", ["categories"])
  },
  methods: {
    ...mapActions("category", ["getCategories", "deleteCategory"]),
    del(id) {
      this.$swal({
        title: "Are you sure this categories?",
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
              .dispatch("category/deleteCategory", id)
              .then(() => {
                this.getCategories();
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
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.startLoading();
      this.getCategories().then(() => {
        this.finishLoading();
      });
    });
  }
};
