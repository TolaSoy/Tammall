import { mapState, mapActions } from "vuex";
import loadingSpin from "~/mixins/loadingSpin";
import global from "~/mixins/global";
import Slide from "~/models/Slides";

export default {
  mixins: [global, loadingSpin],
  data() {
    return {
      id: "",
      slide: this.toObject(new Slide()),
      fileUpload: {},
      fileUrls: {}
    };
  },
  head() {
    return {
      titleTemplate: "Add Slide - Tammall"
    };
  },
  computed: {
    ...mapState("slide", ["slides"])
  },
  methods: {
    ...mapActions("slide", ["getSlides"]),
    addNew() {
      let payload = {
        slide: this.slide,
        fileUpload: this.fileUpload,
        id: this.id
      };
      console.log(payload.slide)
      console.log(payload.fileUpload)
      this.slide.created_at = new Date();
      this.$nextTick(() => {
        this.startLoading();
        this.$store.dispatch("slide/addSlide", payload).then(() => {
          this.$router.push("/slides");
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
          this.$store.dispatch("slide/getSlide", this.id).then(data => {
            this.finishLoading();
            this.slide = data;
          });
        });
      }
    },

    getMultiple(evt) {
      let files = evt.target.files[0];
      this.slide.image = files;
      this.fileUrls = {
        path: URL.createObjectURL(files)
      };
    },
    removeImage() {
      this.slide.image = ''
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
