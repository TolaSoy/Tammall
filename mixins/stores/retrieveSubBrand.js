import {mapState, mapActions, mapGetters} from "vuex";
import loadingSpin from "~/mixins/loadingSpin";
import Category from "~/models/Categories";

export default {
  mixins: [loadingSpin],
  data() {
    return {
      addSubBrand: {},
    };
  },
  head() {
    return {
      titleTemplate: "List Categories - Tammall"
    };
  },
  computed: {
    ...mapState("subbrand", ["subbrands"]),
    ...mapState("brand", ["brands"]),
    ...mapGetters("users", ["getUserStoreId"])
  },
  methods: {
    ...mapActions("subbrand", ["getSubBrands", "deleteSubBrand"]),
    ...mapActions("brand", ["getBrands", "getBrand"]),
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
              .dispatch("subbrand/deleteSubBrand", teamId)
              .then(() => {
                this.finishLoading();
                this.$router.push("/stores/brand?id="+teamId.storeId);
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
        addSubBrand: this.addSubBrand,
        id: this.getUserStoreId
      };
      this.$nextTick(() => {
        this.startLoading();
        this.$store.dispatch("subbrand/addSubBrand", payload).then(() => {
          this.$router.push("/stores/brand?id="+payload.id);
         this.finishLoading();
          this.$swal({
            title: "You, input categories successfully",
            icon: "success"
          });
        });
      });
    },
    changSub(){
      this.addSubBrand = this.addSubBrand;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.startLoading();
      this.getSubBrands(this.getUserStoreId).then(() => {
        this.finishLoading();
      });
      this.getBrands().then(() => {
        this.finishLoading();
      });
    });
  }
};
