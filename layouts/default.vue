<template>
  <div class="wrapper">
    <the-header></the-header>
    <b-sidebar
      id="sidebar-backdrop"
      :backdrop-variant="variant"
      backdrop
      shadow
      no-header
      class="kv-sidebar"
    >
      <div class="kv-sidebar-content">
        <div class="kv-sidebar-user" v-if="user">
          <img
            :src="
              (userProfile && getImage(userProfile.profile, '1080x1080')) ||
              defualProfile
            "
            class="img-fluid rounded-circle mb-2"
            alt="sidebar-user"
          />
          <!--          <div class="font-weight-lighter kv-sidebar-user-name">-->
          <!--            {{userProfile.label_name || userProfile.email }}-->
          <!--          </div>-->
          <ColorModePicker />
        </div>

        <ul class="kv-sidebar-nav">
          <li class="kv-sidebar-item">
            <nuxt-link to="/" class="kv-sidebar-link">
              <i class="fal fa-game-board-alt"></i>
              Dashboard
            </nuxt-link>
          </li>
          <!--          <li v-if="checkTypeUser(userProfile)" class="kv-sidebar-item">-->
          <!--            <nuxt-link to="/product" class="kv-sidebar-link">-->
          <!--              <i class="fal fa-cube"></i>-->
          <!--              Product-->
          <!--            </nuxt-link>-->
          <!--          </li>-->
          <li v-if="getUserStoreId" class="kv-sidebar-item">
            <nuxt-link
              :to="'/stores/product?id=' + getUserStoreId"
              class="kv-sidebar-link"
            >
              <i class="fal fa-cube"></i>
              Product
            </nuxt-link>
          </li>
          <li v-if="checkTypeUser(userProfile)" class="kv-sidebar-item">
            <nuxt-link to="/categories" class="kv-sidebar-link">
              <i class="fal fa-folder-tree"></i>
              Categories
            </nuxt-link>
          </li>
          <li v-else class="kv-sidebar-item">
            <nuxt-link
              :to="'/stores/category?id=' + getUserStoreId"
              class="kv-sidebar-link"
            >
              <i class="fal fa-folder-tree"></i>
              Categories
            </nuxt-link>
          </li>
          <li v-if="checkTypeUser(userProfile)" class="kv-sidebar-item">
            <nuxt-link to="/brands" class="kv-sidebar-link">
              <i class="fal fa-folder-tree"></i>
              Brands
            </nuxt-link>
          </li>
          <li v-else class="kv-sidebar-item">
            <nuxt-link
              :to="{ path: '/stores/brand', query: { id: getUserStoreId } }"
              class="kv-sidebar-link"
            >
              <i class="fal fa-folder-tree"></i>
              Brands
            </nuxt-link>
          </li>
          <li v-if="checkTypeUser(userProfile)" class="kv-sidebar-item">
            <nuxt-link to="/specs" class="kv-sidebar-link">
              <i class="fal fa-folder-tree"></i>
              Specs
            </nuxt-link>
          </li>
          <li v-else class="kv-sidebar-item">
            <nuxt-link
              :to="{ path: '/stores/spec', query: { id: getUserStoreId } }"
              class="kv-sidebar-link"
            >
              <i class="fal fa-folder-tree"></i>
              Specs
            </nuxt-link>
          </li>
          <li v-if="checkTypeUser(userProfile)" class="kv-sidebar-item">
            <nuxt-link to="/slides" class="kv-sidebar-link">
              <i class="fal fa-folder-tree"></i>
              Sildes
            </nuxt-link>
          </li>
          <li v-if="checkTypeUser(userProfile)" class="kv-sidebar-item">
            <nuxt-link to="/stores" class="kv-sidebar-link">
              <i class="fal fa-folder-tree"></i>
              Stores
            </nuxt-link>
          </li>
        </ul>
      </div>
    </b-sidebar>
    <div class="main-content">
      <!-- <the-header></the-header> -->
      <nuxt />
    </div>
  </div>
</template>

<style scpoed></style>

<script>
import TheHeader from "@/components/TheHeader";
import ColorModePicker from "@/components/ColorModePicker";
import userDetail from "~/mixins/userDetail";
export default {
  mixins: [userDetail],
  methods: {
    getImage(url, size) {
      if (url == "" || url == null) {
        return null;
      }
      if (url != null && url != "") {
        url = url.replaceAll(
          "https://firebasestorage.googleapis.com/v0/b/tamneak-d40f1.appspot.com/o/",
          "http://cdn.tamneak.com/"
        );
        url = url.replaceAll(
          "https://firebasestorage.googleapis.com/v0/b/product-eaa84.appspot.com/o/",
          "http://34.120.98.30/"
        );
      }
      // let resultraw = url.replaceAll(".jpg", '_' +size + '.jpg');
      url = url.replaceAll(".jpg", "_" + size + ".jpg");
      url = url.replaceAll(".png", "_" + size + ".png");
      return url;
    },
  },
  components: {
    TheHeader,
    ColorModePicker,
  },
};
</script>
