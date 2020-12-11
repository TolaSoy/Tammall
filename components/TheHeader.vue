<template>
  <header class="header" v-if="user">
    <nav class="navbar">
      <div
        class="nav-left d-flex align-items-center justify-content-start justify-content-lg-between"
      >
        <nuxt-link to="/">
          <div class="d-flex">
            <img src="/assets/images/logo.png" alt />
            <div class="kv-logo-name">Tammall</div>
          </div>
        </nuxt-link>
        <div class="kv-menu-icon ml-lg-auto">
          <b-button v-b-toggle.sidebar-backdrop>
            <i class="fal fa-bars"></i>
          </b-button>
        </div>
      </div>
      <div class="form-group d-none d-md-block mb-0 kv-search-bar has-search ml-auto">
        <span class="fa fa-search form-control-feedback"></span>
        <input type="text" class="form-control" placeholder="Search" />
      </div>
      <div class="dropdown kv-dropdown-search ml-auto d-md-none">
        <a
          class="nav-link dropdown-toggle"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="false"
          aria-expanded="false"
        >
          <i class="fas fa-search"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right animated fadeInUp">
          <form action class="p-3">
            <input
              type="text"
              class="form-control"
              placeholder="Search ..."
              aria-label="Recipient's username"
            />
          </form>
        </div>
      </div>
      <div class="dropdown kv-dropdown-profile">
        <a
          href="javascript:void(0)"
          class="dropdown-toggle d-flex"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="d-none d-sm-block">
            {{userProfile && userProfile.label_name || userProfile && userProfile.email}}
          </span>
          <span class="profile-user-avatar">
            <img
              :src="userProfile && getImage(userProfile.profile,'1080x1080') || defualProfile"
              class="user-image rounded-circle"
              alt="user-profile"
            />
          </span>
        </a>
        <div class="dropdown-menu dropdown-menu-right animated fadeInUp">
          <div class="kv-dropdown-header">
            <h6 class="text-overflow m-0">Welcome !</h6>
          </div>
          <a class="dropdown-item" href>
            <i class="fal fa-user-circle mr-2"></i>
            <span>My Profile</span>
          </a>
          <a @click="logout" class="dropdown-item" href>
            <div>
              <i class="fal fa-sign-out mr-2"></i> Logout
            </div>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { auth } from "@/services/firebase";
import Cookie from "js-cookie";
import userDetail from "~/mixins/userDetail";
import loadingSpin from "~/mixins/loadingSpin";

export default {
  mixins: [userDetail, loadingSpin],
  methods: {
    getImage (url,size){
      if(url=="" || url==null){
        return null;
      }
      if(url!=null && url!=""){
        url = url.replaceAll("https://firebasestorage.googleapis.com/v0/b/tamneak-d40f1.appspot.com/o/", "http://cdn.tamneak.com/");
        url = url.replaceAll("https://firebasestorage.googleapis.com/v0/b/product-eaa84.appspot.com/o/", "http://34.120.98.30/");
      }
      // let resultraw = url.replaceAll(".jpg", '_' +size + '.jpg');
      url = url.replaceAll(".jpg", '_' +size + '.jpg');
      url = url.replaceAll(".png", '_' +size + '.png');
      return url;
    },
    async logout() {
      this.$nextTick(() => {
        this.startLoading();
        this.$store.dispatch("user/signOut");
        this.$router.push("/auth/login");
        this.finishLoading();
      });
      await Cookie.remove("access_token");
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.dropdown-menu > li > a {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: 400;
  line-height: 1.42857143;
  white-space: nowrap;
}

.dropdown-menu > li > a {
  padding: 10px;
  padding-left: 20px;
}

.dropdown-menu li a {
  -webkit-transition: all 0.7s ease;
  transition: all 0.7s ease;
  -o-transition: all 0.7s ease;
}

.hvr-bounce-to-right {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
}

.hvr-bounce-to-right:before {
  background: #f5eff5 !important;
}

.hvr-bounce-to-right:active:before,
.hvr-bounce-to-right:focus:before,
.hvr-bounce-to-right:hover:before {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
  -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
  transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
}

.hvr-bounce-to-right:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #2098d1;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: 0 50%;
  transform-origin: 0 50%;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
</style>
