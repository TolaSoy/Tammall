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
      titleTemplate: "List Specs - Tammall"
    };
  },
  computed: {
    ...mapState("spec", ["specs"])
  },
  methods: {
    ...mapActions("spec", ["getSpecs", "deleteSpec"]),
    del(id) {
      this.$swal({
        title: "Are you sure this Specs?",
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
              .dispatch("spec/deleteSpec", id)
              .then(() => {
                this.getSpecs();
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
      this.getSpecs().then(() => {
        this.finishLoading();
      });
    });
  }
};
