import { mapState, mapActions } from "vuex";
import loadingSpin from "~/mixins/loadingSpin";

export default {
  mixins: [loadingSpin],
  data() {
    return {
      search:''
    };
  },
  head() {
    return {
      titleTemplate: "List Brands - Tammall"
    };
  },
  computed: {
    ...mapState("brand", ["brands"])
  },
  methods: {
    ...mapActions("brand", ["getBrands", "deleteBrand"]),
    del(id) {
      this.$swal({
        title: "Are you sure this Brand?",
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
              .dispatch("brand/deleteBrand", id)
              .then(() => {
                this.getBrands();
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
      this.getBrands().then(() => {
        this.finishLoading();
      });
    });
  }
};
