<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <nuxt-link to="/stores">Store</nuxt-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{ id ? "Update" : "New" }} Store</li>
      </ol>
    </nav>
    <!-- End  breadcrumb-->
    <div class="kv-card px-3 pt-5 mb-4">

      <form class="row">
        <div class="col-lg-4">
          <div class="form-group row">
            <label for class="col-4 col-form-label">Store Profile </label>
            <div class="col-8">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  @change="getMultipleProfile"
                />
                <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for class="col-4 col-form-label">Store Banner </label>
            <div class="col-8">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="banner"
                  aria-describedby="inputGroupFileAddon01"
                  @change="getMultipleBanner"
                />
                <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
              </div>
            </div>
          </div>
          <!-- End form-group -->
          <div class="form-group row">
            <label for class="col-4 col-form-label">Store name</label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                placeholder="Product Name"
                v-model="store.name"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for class="col-4 col-form-label">Store Location</label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                placeholder="Product Name"
                v-model="store.location"
              />
            </div>
          </div>
          <!-- End form-group -->
          <div class="form-group row">
            <label for class="col-4 col-form-label">Store Admin User</label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                placeholder="Store Admin User"
                v-model="username"
                v-on:keyup.enter="getUser"
              />
            </div>
          </div>
          <!-- End form-group -->
          <div class="form-group row">
            <div class="col-lg-8">
              <div class="form-group row">
                <div class="col-sm-4">Status</div>
                <div class="col-sm-8">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="gridCheck1"
                      v-model="store.status"
                    />
                  </div>
                </div>
              </div>
              <!-- End form-group -->
            </div>
          </div>
          <!-- End form-group -->
        </div>

        <!-- End Col-4 -->
        <div v-if="store.profile" class="col-6 col-lg-4">
          <div class="border rounded">
            <div class="text-right mr-1 text-danger" @click="removeImageProfile()">
              <i class="fal fa-times"></i>
            </div>
            <div v-if="typeof store.profile.path == 'string'" class="px-3 pb-3">
              <a :href="getImage(store.profile.path,'1080x1080')" target="_blank">
                <img :src="getImage(store.profile.path,'1080x1080')" class="w-100 rounded" alt="pro-image" />
              </a>
            </div>
            <div v-else class="px-3 pb-3">
              <a :href="getLocallImageUrlProfile()" target="_blank">
                <img :src="getLocallImageUrlProfile()" class="w-100 rounded" alt="pro-image" />
              </a>
            </div>
          </div>
        </div>
        <div v-if="store.banner" class="col-6 col-lg-4">
          <div class="border rounded">
            <div class="text-right mr-1 text-danger" @click="removeImageBanner()">
              <i class="fal fa-times"></i>
            </div>
            <div v-if="typeof store.banner.path == 'string'" class="px-3 pb-3">
              <a :href="getImage(store.banner.path,'1080x1080')" target="_blank">
                <img :src="getImage(store.banner.path,'1080x1080')" class="w-100 rounded" alt="pro-image" />
              </a>
            </div>
            <div v-else class="px-3 pb-3">
              <a :href="getLocallImageUrlBanner()" target="_blank">
                <img :src="getLocallImageUrlBanner()" class="w-100 rounded" alt="pro-image" />
              </a>
            </div>
          </div>
        </div>
        <!-- End col-8 -->
      </form>
      <div v-if="userByusername.length>0" class="row mt-5">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table kv-table">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Profile</th>
                <th scope="col">Label Name</th>
                <th scope="col">Username</th>
                <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(user, index) in userByusername" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                  <a :href="user.profile" target="_blank">
                    <img
                      class="p-image rounded-pill"
                      :src="user.profile"
                      alt="pro-image"
                    />
                  </a>
                </td>
                <td>{{ user.label_name }} {{user.verify}}  <i v-show="user.verify" class="fas fa-check-circle" style="color: #00a8ff;"></i></td>
                <td>{{ user.username }}</td>
                <td><b-button @click="choose(user)" variant="success">Choose</b-button></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <!-- End form-group -->
    </div>
    <div class="kv-card p-3">
      <div class="row justify-content-end">
        <div class="flex justify-content-end text-right">
          <button @click="add" type="button" class="btn min-w-150 btn-primary mr-4">Save</button>
          <nuxt-link to="/product" type="button" class="btn min-w-150 btn-danger">Don't Save</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import addStore from "~/mixins/addStore";
  export default {
    mixins: [addStore],
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
      }
    }
  };
</script>

