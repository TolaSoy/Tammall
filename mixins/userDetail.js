import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      variant: "dark",
      userProfile: "",
      storeById: "",
      defualProfile: "/assets/images/avartar.png"
    };
  },
  watch:{
    '$route.query': '$fetch'
  },
  // watchQuery: true,
  async fetch(){
    const uid = this.$store.state.users.user && this.$store.state.users.user.uid;
    if (uid!=null){
      await this.$store.dispatch("users/getDetail", {uid});
    }
  },
  computed: {
    ...mapState("users", ["user", "detail","storeData"]),
    ...mapGetters("users", ['getUserStoreId'])
  },
  methods: {
    refresh() {
      this.$fetch
    },
     checkTypeUser() {
       try {
         let admin = this.userProfile.permission.includes('root');
         return admin;
       }catch (e) {

       }
    }
  },
  mounted() {
    this.userProfile = this.detail;
  }
};
