import {mapState, mapActions, mapGetters} from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import loadingSpin from "~/mixins/loadingSpin";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import global from "~/mixins/global";
import Product from "~/models/Product";

export default {
  mixins: [global, loadingSpin],
  components: {
    ckeditor: CKEditor.component,
    VueSweetalert2
  },
  head() {
    return {
      titleTemplate: "Add Product - Tammall"
    };
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {},
      id: "",
      product: this.toObject(new Product()),
      fileUpload: [],
      fileUrls: []
    };
  },
  computed: {
    ...mapState("subbrand", ["subbrands"]),
    ...mapState("spec", ["specs"]),
    ...mapState("product", ["products"]),
    ...mapState("subcategory", ["subcategories"]),
    ...mapState("users", ["user", "detail"]),
    ...mapGetters("users", ["getUserStoreId"])
  },
  methods: {
    ...mapActions("brand", ["getBrands"]),
    ...mapActions("spec", ["getSpec"]),
    ...mapActions("subbrand", ["getSubBrands", 'getSubBrand']),
    ...mapActions("spec", ["getSpecs", 'getSpec']),
    ...mapActions("subcategory", ["getSubCategories", 'getSubCategory']),
    ...mapActions("product", ["getProducts", "getProduct"]),
    add() {
      this.product.created_at = new Date();
      if(this.product.category) {
        this.$store.dispatch('category/getCategory', this.product.category).then((data) => {
          this.product.category  = data;
        });
      }
      if(this.product.brand) {
        this.$store.dispatch('brand/getBrand', this.product.brand).then((data) => {
          this.product.brand  = data;
        });
      }
      if(this.product.spec) {
        this.$store.dispatch('spec/getSpec', this.product.spec).then((data) => {
          this.product.spec  = data;
        });
      }

      let payload = {
        product: this.product,
        fileUpload: this.fileUpload,
        id: this.id,
        storeId: this.getUserStoreId
      };
      this.$nextTick(() => {
        this.startLoading();
        this.$store.dispatch("product/addProduct", payload).then(() => {
          this.finishLoading();
          this.$router.push("/stores/product?id="+this.getUserStoreId);
          this.$swal({
            title: "You, input product info successfully",
            icon: "success"
          });
        });
      });
    },
    async getEdit() {
      let payload = {
        storeId: this.getUserStoreId,
        id: this.id
      };
      if (this.id) {
        this.$nextTick(() => {
          this.startLoading();
          this.$store.dispatch("product/getProduct", payload).then(data => {
            this.product = data;
            this.product.category = this.product.category.id;
            this.product.brand = this.product.brand.id;
            this.product.spec = this.product.spec.id;
            console.log({product: this.product});
            this.finishLoading();
          });
        });
      }
    },
    getMultiple(evt) {
      let files = evt.target.files;
      for (var i = 0, file; (file = files[i]); i++) {
        this.product.image.push(file);
        let lastImageIndex = this.product.image.length - 1;
        this.fileUrls.push({
          id: lastImageIndex,
          url: URL.createObjectURL(file)
        });
      }
    },
    removeImage(index) {
      this.product.image = this.product.image.filter(
        (image, imgIndex) => imgIndex != index
      );
      if (this.fileUrls.length) {
        this.fileUrls.map(file => {
          file.id = file.id - 1;
          file.url = file.url;
        });
      }
    },
    getLocallImageUrl(index) {
      let image = this.fileUrls.filter(file => file.id == index);
      if(image!=null && image.length>0){
        return image[0].url;
      }
    },
    clearImage() {
      if(!this.id) {
        this.product.image = [];
      }
    },
  },
  async mounted() {
    this.id = this.$route.query.id;
    await this.getSubCategories(this.getUserStoreId);
    await this.getSubBrands(this.getUserStoreId);
    await this.getSpecs();
    await this.getProducts(this.getUserStoreId);
    await this.getEdit();
    this.clearImage();
  }
};
