<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <nuxt-link to="/slides">Slides</nuxt-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ id ? "Update" : "New" }}
          Brand
        </li>
      </ol>
    </nav>
    <div class="kv-card px-3 pt-5 mb-4">
      <form class="row" >
        <div class="col-lg-5">
          <div class="form-group row">
            <label for class="col-5 col-form-label">Slides Name</label>
            <div class="col-7">
              <input
                v-on:keyup.enter="addNew"
                type="text"
                class="form-control"
                placeholder="Samsung"
                v-model="slide.title"
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
          <!-- End form-group -->
        </div>
        <div v-if="slide.image" class="col-lg-5">
          <div class="border rounded">
            <div class="text-right mr-1 text-danger" @click="removeImage()">
              <i class="fal fa-times"></i>
            </div>
            <div v-if="typeof slide.image.path == 'string'" class="px-3 pb-3">
              <a :href="getImage(slide.image.path,'1080x1080')" target="_blank">
                <img :src="getImage(slide.image.path,'1080x1080')" class="w-100 rounded" alt="pro-image" />
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
            :disabled="!slide.title"
            type="button"
            class="btn min-w-150 btn-primary mr-4"
          >
            Save
          </button>
          <nuxt-link
            to="/brands"
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
  import addSlide from "~/mixins/addSlide";
  export default {
    mixins: [addSlide],
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

<style scoped>

</style>
