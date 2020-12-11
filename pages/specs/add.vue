<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <nuxt-link to="/spec">Specs</nuxt-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page"> Specs</li>
      </ol>
    </nav>
    <!-- End  breadcrumb-->
    <div class="kv-card px-3 pt-5 mb-4">
      <form class="row">
        <div class="col-lg-4">
          <!-- End form-group -->
          <div class="form-group row">
            <label for class="col-4 col-form-label">Specs name</label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                placeholder="Specs Name"
                v-model="spec.name"
                v-on:input="getcode()"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for class="col-4 col-form-label">Specs Code</label>
            <div class="col-8">
              <input
                disabled
                type="text"
                class="form-control"
                placeholder="Specs Code"
                v-model="spec.code"
              />
            </div>

          </div>
        </div>

        <div class="col-12">
          <div class="form-group">
            <label for class="col-form-label">Description</label>
            <ckeditor :editor="editor" v-model="spec.description" :config="editorConfig"></ckeditor>
          </div>
        </div>

         
          <!-- End sub spec -->
        
      </form>

       <!-- Sub spect -->
          <div class="col-lg-4">
            <div class="form-group row">
              <label for class="col-4 col-form-label">Specs</label>
              <div class="col-8">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Specs"
                  v-model="de_spec"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for class="col-4 col-form-label">Value</label>
              <div class="col-8">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Value"
                  v-model="value"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for class="col-4 col-form-label">Icon</label>
              <div class="col-8">
                <div class="custom-file">
                  <input
                  type="file"
                  id="inputGroupFile01"
                  class="custom-file-input"
                  @change="getMultiple"
                  />
                  <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                </div>
              </div>
            </div>

            <div v-if="cachespec.icon" class="col-lg-5">
          <div class="border rounded">
            <div class="text-right mr-1 text-danger" @click="removeImage()">
              <i class="fal fa-times"></i>
            </div>
            <div v-if="typeof cachespec.icon == 'string'" class="px-3 pb-3">
              <a :href="convertBlob(cachespec.icon.path)" target="_blank">
                <img :src="convertBlob(cachespec.icon.path)" class="w-100 rounded" alt="pro-image" />
              </a>
            </div>
            <div v-else class="px-3 pb-3">
              <a :href="getLocallImageUrl()" target="_blank">
                <img :src="getLocallImageUrl()" class="w-100 rounded" alt="pro-image" />
              </a>
            </div>
          </div>
        </div>
            
            <button @click='addTocache' class="btn btn-outline-primary">Submit</button>
          </div>

      <div v-if="cachespec.length > 0">
        <table class="table mt-5">
        <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Key</th>
          <th scope="col">Value</th>
          <th scope="col">Icon</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cache, index) in cachespec" :key="index">
          <th scope="row">{{ index+1 }}</th>
          <td>{{cache.de_spec}}</td>
          <td>{{cache.value }}</td>

          <td><img
                class="p-image rounded"
                style = "width: 50px"
                :src="convertBlob(cache.icon)"
                alt="pro-image"
              /></td>
          <td>
                <div class="dropleft">
                  <i
                    class="fas fa-ellipsis-v"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></i>
                  <div
                    class="dropdown-menu mr-3"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div class="drop-wrap">
                      <nuxt-link
                        class="dropdown-item"
                        :to="'/brands/add?id=' + spec.id"
                      >
                      </nuxt-link>
                      <a
                        class="dropdown-item"
                        @click="del(spec.id)"
                        href="#"
                      >
                        <i class="fal fa-times-circle"></i> Delete
                      </a>
                    </div>
                  </div>
                </div>
              </td>
        </tr>
     
      </tbody>
    </table>
      </div>
      <!-- End form-group -->
    </div>
    <div class="kv-card p-3">
      <div class="row justify-content-end">
        <div class="col-lg-4 flex justify-content-end text-right">
          <button
            @click="addNew"
            :disabled="!spec.name"
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
    <!-- End Card -->
    <!-- :on-cancel="onCancel" -->
  </div>
</template>

<script>
  import addSpec from "~/mixins/addSpec";
  export default {
    mixins: [addSpec],
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

<style>
  .ck.ck-editor__main > .ck-editor__editable/* :not(.ck-focused) */ {
    height: 300px;
  }
</style>
