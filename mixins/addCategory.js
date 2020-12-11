import { mapState, mapActions } from "vuex";
import loadingSpin from "~/mixins/loadingSpin";
import Category from "~/models/Categories";
import global from "~/mixins/global";

export default {
  mixins: [global, loadingSpin],
  data() {
    return {
      id: "",
      category: this.toObject(new Category()),
      fileUpload: {},
      fileUrls: {}
    };
  },
  head() {
    return {
      titleTemplate: "Add Category - Tammall"
    };
  },
  computed: {
    ...mapState("category", ["categories"])
  },
  methods: {
    ...mapActions("category", ["getCategory"]),
    addNew() {
      let payload = {
        category: this.category,
        id: this.id
      };
      this.category.created_at = new Date();
      this.$nextTick(() => {
        this.startLoading();
        this.$store.dispatch("category/addCategory", payload).then(() => {
          this.$router.push("/categories");
          this.finishLoading();
          this.$swal({
            title: "You, input categories successfully",
            icon: "success"
          });
        });
      });
    },
    async getEdit() {
      if (this.id) {
        this.$nextTick(() => {
          this.startLoading();
          this.$store.dispatch("category/getCategory", this.id).then(data => {
            this.finshLoading=true;
            this.category = data;
          });
        });
      }
    },
    getMultiple(evt) {
      let files = evt.target.files[0];
      this.category.image = files;
      this.fileUrls = {
        url: URL.createObjectURL(files)
      };
    },
    removeImage() {
      this.category.image = ''
      this.fileUrls.url = ''
      let image = this.fileUrls.url;
      return image;
    },
    getLocallImageUrl() {
      let image = this.fileUrls.url;
      return image;
    }
  },
  async mounted() {
    this.id = this.$route.query.id;
    await this.getEdit();
  }
};
