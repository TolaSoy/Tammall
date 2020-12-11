import {mapState, mapActions, mapGetters} from "vuex";
import loadingSpin from "~/mixins/loadingSpin";
import Category from "~/models/Categories";

export default {
  mixins: [loadingSpin],
  data() {
    return {
      addSubcagory: {},
      // addSubcagory: this.toObject(new Category()),
    };
  },
  head() {
    return {
      titleTemplate: "List Categories - Tammall"
    };
  },
  computed: {
    ...mapState("subcategory", ["subcategories"]),
    ...mapState("category", ["categories"]),
    ...mapGetters("users", ["getUserStoreId"])
  },
  methods: {
    ...mapActions("subcategory", ["getSubCategories", "deleteCategory"]),
    ...mapActions("category", ["getCategories", "getCategory"]),
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
              .dispatch("subcategory/deleteSubCategory", teamId)
              .then(() => {
                this.finishLoading();
                this.$router.push("/stores/category?id="+teamId.storeId);
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
        addSubcagory: this.addSubcagory,
        id: this.getUserStoreId
      };
      this.$nextTick(() => {
        this.startLoading();
        this.$store.dispatch("subcategory/addSubCategory", payload).then(() => {
          this.$router.push("/stores/category?id="+payload.id);
         this.finishLoading();
          this.$swal({
            title: "You, input categories successfully",
            icon: "success"
          });
        });
      });
    },
    changSub(){
      this.addSubcagory = this.addSubcagory;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.startLoading();
      this.getSubCategories(this.getUserStoreId).then(() => {
        this.finishLoading();
      });
      this.getCategories().then(() => {
        this.finishLoading();
      });
    });
  }
};
