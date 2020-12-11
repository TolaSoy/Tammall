<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <nuxt-link to="/category">Category</nuxt-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ id ? "Update" : "New" }} Category
        </li>
      </ol>
    </nav>
    <div class="kv-card px-3 pt-5 mb-4">
      <form class="row">
        <div class="col-lg-5">
          <div class="form-group row">
            <label for class="col-5 col-form-label">Category name</label>
            <div class="col-7">
              <input
                v-on:keyup.enter="addNew"
                type="text"
                class="form-control"
                placeholder="Category Name"
                v-model="category.name"
              />
            </div>
          </div>
          <!-- End form-group -->
          <div class="form-group row">
            <label for class="col-5 col-form-label">Description</label>
            <div class="col-7">
              <textarea
                rows="3"
                class="form-control"
                placeholder="Description"
                v-model="category.description"
              />
            </div>
          </div>
          <!-- End form-group -->
          <!-- End form-group -->
          <div class="form-group row">
            <label for class="col-5 col-form-label">File</label>
            <div class="col-7">
              <input
                required
                type="file"
                class="form-control"
                id="inputGroupFile01"
                placeholder="Iphone"
                @change="getMultiple"
              />
            </div>
          </div>
        </div>
        <div v-if="category.image" class="col-lg-5">
          <div class="border rounded">
            <div class="text-right mr-1 text-danger" @click="removeImage()">
              <i class="fal fa-times"></i>
            </div>
            <div v-if="typeof category.image.path == 'string'" class="px-3 pb-3">
              <a :href="getImage(category.image.path,'1080x1080')" target="_blank">
                <img :src="getImage(category.image.path,'1080x1080')" class="w-100 rounded" alt="pro-image" />
              </a>
            </div>
            <div v-else class="px-3 pb-3">
              <a :href="getLocallImageUrl()" target="_blank">
                <img :src="getLocallImageUrl()" class="w-100 rounded" alt="pro-image" />
              </a>
            </div>
          </div>
        </div>
      </form>
      <!-- End form-group -->
    </div>
    <div class="kv-card p-3">
      <div class="row justify-content-end">
        <div class="col-lg-4 flex justify-content-end text-right">
          <button
            @click="addNew"
            :disabled="!category.name"
            type="button"
            class="btn min-w-150 btn-primary mr-4"
          >
            Save
          </button>
          <nuxt-link
            to="/category"
            type="button"
            class="btn min-w-150 btn-danger"
            >Don't Save</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addCategory from "~/mixins/addCategory";
export default {
  mixins: [addCategory],
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

<style lang="scss" scoped></style>
