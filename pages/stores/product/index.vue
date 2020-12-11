<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Product</li>
      </ol>
    </nav>
    <!-- End  breadcrumb-->
    <div class="kv-card">
      <div class="kv-card-header">
        <div class="row">
          <div class="col-12 col-sm-6">
            <form>
              <div class="form-group mb-0">
                <label for="exampleInputEmail1">Search Product name</label>
                <input type="text" class="form-control" id="search" />
              </div>
            </form>
          </div>
          <div class="col-12 col-sm-6 text-right align-self-end">
            <nuxt-link to="/stores/product/add" class="btn btn-primary">
              <i class="fal fa-plus-circle"></i>
              Add New Product
            </nuxt-link>
          </div>
        </div>
      </div>
      <!--  -->
      <!--  -->
      <div class="table-responsive">
        <table class="table kv-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col" class="m-w-150">Product name</th>
              <th scope="col" class="m-w-150">Price</th>
              <th scope="col" class="m-w-300">Specs</th>
              <th scope="col">Status</th>
              <th scope="col" class="m-w-150">Create Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <a
                  :href="getImage(product.image[0].path, '1080x1080')"
                  target="_blank"
                >
                  <img
                    class="p-image rounded"
                    :src="getImage(product.image[0].path, '1080x1080')"
                    alt="pro-image"
                  />
                </a>
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }} $</td>
              <td>
                <div v-html="product.specs"></div>
              </td>
              <td>
                <div class="custom-control custom-switch">
                  <input
                    :checked="product.status"
                    type="checkbox"
                    class="custom-control-input"
                    :id="'customSwitch' + index"
                  />
                  <label
                    @click="toggle(product.id, product.status)"
                    class="custom-control-label"
                    :for="'customSwitch' + index"
                  ></label>
                </div>
              </td>
              <td>{{ $dateFormat(product.created_at) }}</td>
              <td>
                <!-- Split dropleft button -->
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
                        :to="'/stores/product/add?id=' + product.id"
                      >
                        <i class="fal fa-edit"></i> Edit
                      </nuxt-link>
                      <button
                        @click="del(product.id)"
                        class="dropdown-item"
                        href="#"
                      >
                        <i class="fal fa-times-circle"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- End Table -->
      <div
        class="kv-pagination d-flex flex-column flex-sm-row justify-content-sm-between align-items-center"
      >
        <div class="info">show from 1 to 10 of 85</div>
        <nav aria-label="Page navigation example">
          <ul class="pagination mb-0">
            <li class="page-item">
              <a class="page-link">Previous</a>
            </li>
            <li class="page-item">
              <a class="page-link">1</a>
            </li>
            <li class="page-item">
              <a class="page-link">2</a>
            </li>
            <li class="page-item">
              <a class="page-link">3</a>
            </li>
            <li class="page-item">
              <a class="page-link">Next</a>
            </li>
          </ul>
        </nav>
      </div>
      <!-- End Pagination -->
    </div>
    <!-- End Card -->
  </div>
</template>
<script>
import retrieveProducts from "~/mixins/retrieveProducts";

export default {
  mixins: [retrieveProducts],
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
};
</script>

<style lang="scss" scoped></style>
