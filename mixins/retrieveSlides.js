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
      titleTemplate: "List Slides - Tammall"
    };
  },
  computed: {
    ...mapState("slide", ["slides"])
  },
  methods: {
    ...mapActions("slide", ["getSlides", "deleteSlide"]),
    del(id) {
      this.$swal({
        title: "Are you sure this Slide?",
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
              .dispatch("slide/deleteSlide", id)
              .then(() => {
                this.getSlides();
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
      this.getSlides().then(() => {
        this.finishLoading();
      });
    });
  }
};
