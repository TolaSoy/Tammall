<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <nuxt-link to="/product">Product</nuxt-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ id ? "Update" : "New" }} Product
        </li>
      </ol>
    </nav>
    <!-- End  breadcrumb-->
    <div class="kv-card px-3 pt-5 mb-4">
      <form class="row">
        <div class="col-lg-4">
          <div class="form-group row">
            <label for class="col-4 col-form-label">Image</label>
            <div class="col-8">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  multiple
                  @change="getMultiple"
                />
                <label class="custom-file-label" for="inputGroupFile01"
                  >Choose file</label
                >
              </div>
            </div>
          </div>
          <!-- End form-group -->
          <div class="form-group row">
            <label for class="col-4 col-form-label">Product name</label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                placeholder="Product Name"
                v-model="product.name"
              />
            </div>
          </div>
          <!-- End form-group -->
          <div class="form-group row">
            <label for class="col-4 col-form-label">Price</label>
            <div class="col-8">
              <input
                type="number"
                class="form-control"
                placeholder="$ price"
                v-model="product.price"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for class="col-4 col-form-label">Discount</label>
            <div class="col-8">
              <input
                type="number"
                class="form-control"
                placeholder="% Discount"
                v-model="product.discount"
              />
            </div>
          </div>

          <!-- End form-group -->
          <div class="form-group row">
            <label for class="col-4 col-form-label">Category</label>
            <div class="col-8">
              <select class="form-control" v-model="product.category">
                <option selected>Choose...</option>
                <option
                  v-for="(category, index) in subcategories"
                  :key="index"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
          <!-- End form-group -->
          <!-- End form-group -->
          <div class="form-group row">
            <label for class="col-4 col-form-label">Brands</label>
            <div class="col-8">
              <select class="form-control" v-model="product.brand">
                <option selected>Choose...</option>
                <option
                  v-for="(brand, index) in subbrands"
                  :key="index"
                  :value="brand.id"
                >
                  {{ brand.name }}
                </option>
              </select>
            </div>
          </div>
          <!-- End form-group -->
          <!-- End form-group -->
          <div class="form-group row">
            <label for class="col-4 col-form-label">Specitifition</label>
            <div class="col-8">
              <select class="form-control" v-model="product.spec">
                <option selected>Choose...</option>
                <option
                  v-for="(spec, index) in specs"
                  :key="index"
                  :value="spec.id"
                >
                  {{ spec.name }}
                </option>
              </select>
            </div>
          </div>
          <!-- End form-group -->
        </div>
        <!-- End Col-4 -->
        <div
          v-if="product.image != null && product.image.length > 0"
          class="col-lg-8 row"
        >
          <div
            v-for="(image, index) in product.image"
            :key="index"
            :class="(index > 0 ? 'col-3' : 'col-6') + ' pb-3'"
          >
            <div v-if="image" class="border rounded">
              <div
                class="text-right mr-1 text-danger"
                @click="removeImage(index)"
              >
                <i class="fal fa-times"></i>
              </div>
              <div class="px-3 pb-3">
                <a
                  :href="image.path ? image.path : getLocallImageUrl(index)"
                  target="_blank"
                >
                  <img
                    :src="image.path ? image.path : getLocallImageUrl(index)"
                    class="w-100 rounded"
                    alt="pro-image"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- End col-8 -->

        <div class="col-12">
          <div class="form-group">
            <label for class="col-form-label">Description</label>
            <ckeditor
              :editor="editor"
              v-model="product.description"
              :config="editorConfig"
            ></ckeditor>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group row">
            <div class="col-sm-4">Status</div>
            <div class="col-sm-8">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck1"
                  v-model="product.status"
                />
              </div>
            </div>
          </div>
          <!-- End form-group -->
        </div>
      </form>
      <!-- End form-group -->
    </div>
    <div class="kv-card p-3">
      <div class="row justify-content-end">
        <div class="col-lg-4 flex justify-content-end text-right">
          <button
            @click="add"
            type="button"
            class="btn min-w-150 btn-primary mr-4"
          >
            Save
          </button>
          <nuxt-link
            :to="'/stores/product?id=' + this.getUserStoreId"
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
import addProduct from "~/mixins/addProduct";
export default {
  mixins: [addProduct],
};
</script>

<style>
.ck.ck-editor__main > .ck-editor__editable/* :not(.ck-focused) */ {
  height: 300px;
}
</style>
