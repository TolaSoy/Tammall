import { mapState, mapActions } from "vuex";
import loadingSpin from "~/mixins/loadingSpin";
import global from "~/mixins/global";
import Brand from "~/models/Brands";

export default {
  mixins: [global, loadingSpin],
  data() {
    return {
      id: "",
      brand: this.toObject(new Brand()),
      fileUpload: {},
      fileUrls: {}
    };
  },
  head() {
    return {
      titleTemplate: "Add Brand - Tammall"
    };
  },
  computed: {
    ...mapState("brand", ["brands"])
  },
  methods: {
    ...mapActions("brand", ["getBrands"]),
    addNew() {
      let payload = {
        brand: this.brand,
        fileUpload: this.fileUpload,
        id: this.id
      };
      console.log(payload.brand)
      console.log(payload.fileUpload)
      this.brand.created_at = new Date();
      this.$nextTick(() => {
        this.startLoading();
        this.$store.dispatch("brand/addBrand", payload).then(() => {
          this.$router.push("/brands");
          this.finshLoading = true;
          this.$swal({
            title: "You, input Brand successfully",
            icon: "success"
          });
        });
      });
    },
    async getEdit() {
      if (this.id) {
        this.$nextTick(() => {
          this.startLoading();
          this.$store.dispatch("brand/getBrand", this.id).then(data => {
            this.finishLoading();
            this.brand = data;
          });
        });
      }
    },

    getMultiple(evt) {
      let files = evt.target.files[0];
      this.brand.image = files;
      this.fileUrls = {
        path: URL.createObjectURL(files)
      };
    },
    removeImage() {
      this.brand.image = ''
      this.fileUrls.url = ''
      let image = this.fileUrls.path;
      return image;
    },
    getLocallImageUrl() {
      let image = this.fileUrls.path;
      return image;
    }
  },
  async mounted() {
    this.id = this.$route.query.id;
    await this.getEdit();
  }
};
