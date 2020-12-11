import {mapState, mapActions, mapGetters} from "vuex";
import loadingSpin from "~/mixins/loadingSpin";

export default {
  mixins: [loadingSpin],
  data() {
    return {
      addSubSpec: {},
    };
  },
  head() {
    return {
      titleTemplate: "List Categories - Tammall"
    };
  },
  computed: {
    ...mapState("subspec", ["subspecs"]),
    ...mapState("spec", ["specs"]),
    ...mapGetters("users", ["getUserStoreId"])
  },
  methods: {
    ...mapActions("subspec", ["getSubSpecs", "deleteSubSpec"]),
    ...mapActions("spec", ["getSpecs", "getSpec"]),
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
            let teamId = {
              id: id,
              storeId: this.getUserStoreId
            };
            this.$store
              .dispatch("subspec/deleteSubSpec", teamId)
              .then(() => {
                this.finishLoading();
                this.$router.push("/stores/spec?id="+teamId.storeId);
                this.$swal({
                  title: "You, deleted successfully",
                  icon: "success"
                });
              });
          });
        }
      });
    },
    addNew() {
      let payload = {
        addSubSpec: this.addSubSpec,
        id: this.getUserStoreId
      };
      this.$nextTick(() => {
        this.startLoading();
        this.$store.dispatch("subspec/addSubSpec", payload).then(() => {
          this.$router.push("/stores/spec?id="+payload.id);
         this.finishLoading();
          this.$swal({
            title: "You, input categories successfully",
            icon: "success"
          });
        });
      });
    },
    changSub(){
      this.addSubSpec = this.addSubSpec;
      console.log("this.addSubSpec",this.addSubSpec)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.startLoading();
      this.getSubSpecs(this.getUserStoreId).then(() => {
        this.finishLoading();
      });
      this.getSpecs().then(() => {
        this.finishLoading();
      });
    });
  }
};
