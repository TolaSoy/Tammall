import { mapState, mapActions } from "vuex";
import loadingSpin from "~/mixins/loadingSpin";
import global from "~/mixins/global";
import Specs from "~/models/Specs";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import VueSweetalert2 from "vue-sweetalert2";

export default {
  components: {
    ckeditor: CKEditor.component,
    VueSweetalert2
  },
  mixins: [global, loadingSpin],
  data() {
    return {
      subfile:{},
      de_spec : '',
      value : '',
      cachespec : [],
      id: "",
      spec:  this.toObject(new Specs()),
      fileUpload: this.fileUpload,
      editor: ClassicEditor,
      editorConfig: {},
    };
  },
  head() {
    return {
      titleTemplate: "Add Specs - Tammall"
    };
  },
  computed: {
    ...mapState("spec", ["specs"])
  },
  methods: {
    ...mapActions("spec", ["getSpecs"]),
  
    addTocache(){
      let subspeccache = {
        de_spec : this.de_spec,
        value : this.value,
        icon : this.subfile,
      };
      this.de_spec = '';
      this.value = '';
      this.icon = '';
      this.cachespec.push(subspeccache);
      
    },
    addNew() {
      let payload = {
        cachespec : this.cachespec,
        spec: this.spec,
        id: this.id
      };
    
      this.spec.created_at = new Date();
      this.$nextTick(() => {
        this.startLoading();
        this.$store.dispatch("spec/addSpec", payload).then(() => {
          this.$router.push("/specs");
          this.finshLoading=true;
          this.$swal({
            title: "You, input Specs successfully",
            icon: "success"
          });
        });
      });
    },
    async getEdit() {
      if (this.id) {
        this.$nextTick(() => {
          this.startLoading();
          this.$store.dispatch("spec/getSpec", this.id).then(data => {
            this.finishLoading=true;
            this.spec = data;
          });
        });
      }
    },
    async getcode() {
      this.spec.code = this.spec.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
      return this.spec.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    },
    getMultiple(evt) {
      console.log("Heloo");
      let files = evt.target.files[0];
      this.subfile = files;
      console.log(URL.createObjectURL(files));
      this.fileUrls = {
        path: URL.createObjectURL(files)
      };
    },
    convertBlob(file){
      return URL.createObjectURL(file);
    },
    getLocallImageUrl() {
      let image = this.fileUrls.path;
      console.log("Uddam assas",image);
      return image;
    },
    removeImage() {
      this.spec.icon = ''

      let icon = this.fileUrls.path;
      return icon;
    },
  },
  async mounted() {
    this.id = this.$route.query.id;
    await this.getEdit();
  }
};
