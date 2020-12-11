import { mapState, mapActions } from "vuex";
import loadingSpin from "~/mixins/loadingSpin";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import global from "~/mixins/global";
import Store from "~/models/Stores";
import algoliasearch from "algoliasearch";

export default {
  mixins: [global, loadingSpin],
  components: {
    VueSweetalert2
  },
  head() {
    return {
      titleTemplate: "Add Store - Tammall"
    };
  },
  data() {
    return {
      username:'',
      id: "",
      store: this.toObject(new Store()),
      fileUploadProfile: [],
      fileUploadBanner: [],
      fileUrlsProfile: [],
      fileUrlsBanner: [],
      userByusername: []
    };
  },
  computed: {
    ...mapState("brand", ["brands"]),
    ...mapState("spec", ["specs"]),
    ...mapState("category", ["categories"]),
    ...mapState("users", ["user", "detail"]),
    ...mapState("store", ["stores"])
  },
  methods: {
    ...mapActions("brand", ["getBrands", 'getBrand']),
    ...mapActions("spec", ["getSpecs", 'getSpec']),
    ...mapActions("category", ["getCategories", 'getCategory']),
    ...mapActions("product", ["addProduct", "getProduct"]),
    ...mapActions("store", ["addStore", "getStore"]),
    add() {
       this.store.created_at = new Date();
      let payload = {
        store: this.store,
        fileUploadProfile: this.fileUploadProfile,
        fileUploadBanner: this.fileUploadBanner,
        id: this.id
      };
      this.$nextTick(() => {
        this.startLoading();
        this.$store.dispatch("store/addStore", payload).then(() => {
          this.finishLoading();
          this.$router.push("/stores");
          this.$swal({
            title: "You, input Store info successfully",
            icon: "success"
          });
        });
      });
    },
    async getEdit() {
      if (this.id) {
        this.$nextTick(() => {
          this.startLoading();
          this.$store.dispatch("store/getStore", this.id).then(data => {
            this.store = data;
            this.username = data.user.label_name;
            this.finishLoading();
          });
        });
      }
    },
    getMultipleProfile(evt) {
      let files = evt.target.files[0];
      this.store.profile = files;
      console.log(this.store)
      this.fileUrlsProfile = {
        path: URL.createObjectURL(files)
      };
    },
    removeImageProfile() {
      this.store.profile = ''
      this.fileUrlsProfile.path = ''
      let image = this.fileUrlsProfile.path;
      return image;
    },
    getLocallImageUrlProfile() {
      let image = this.fileUrlsProfile.path;
      return image;
    },
    getMultipleBanner(evt) {
      let files = evt.target.files[0];
      this.store.banner = files;
      console.log(this.store)
      this.fileUrlsBanner = {
        path: URL.createObjectURL(files)
      };
    },
    removeImageBanner() {
      this.store.banner = ''
      this.fileUrlsBanner.path = ''
      let image = this.fileUrlsBanner.path;
      return image;
    },
    getLocallImageUrlBanner() {
      let image = this.fileUrlsBanner.path;
      return image;
    },
    getUser(){
      const client = algoliasearch('T3PEB0BQAS', '2777b7853639fd5151b0a0ab4bb3209f');
      const index = client.initIndex('userdetail');
      index.search(this.username, {
        attributesToRetrieve: ['username', 'label_name','profile','verify'],
        hitsPerPage: 50,
      }).then(({ hits }) => {
        this.userByusername = hits;
      });
    },
    choose(user){
      let {label_name,profile,username,verify} = user;
      this.userByusername= [];
      console.log(label_name)
      console.log(profile)
      console.log(username)
      console.log(verify)

      this.store.member = [username];
      this.store.user = {
        label_name:label_name,
        profile:profile,
        username:username,
        verify:verify
      };
      this.username = user.label_name;
    }
  },
  async mounted() {
    this.id = this.$route.query.id;
    // await this.getCategories();
    // await this.getBrands();
    await this.getEdit();
  }
};
