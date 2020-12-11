<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Slide</li>
      </ol>
    </nav>
    <div class="kv-card">
      <div class="kv-card-header">
        <div class="row justify-content-between">
          <div class="col-12 col-sm-6 col-lg-4">
            <form>
              <div class="form-group mb-0">
                <label for="exampleInputEmail1">Search Slide</label>
                <input type="text" class="form-control" id="search" v-b-modal="search"/>
              </div>
            </form>
          </div>
          <div class="col-12 col-sm-6 text-right align-self-end">
            <nuxt-link to="/slides/add" class="btn btn-primary">
              <i class="fal fa-plus-circle"></i>
              Add New Slide
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table kv-table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Slide title</th>
            <th scope="col">Create Date</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(slide, index) in slides" :key="index">
              <td scope="row">{{ index + 1 }}</td>
              <td><img
                class="p-image rounded"
                :src="getImage(slide.image.path,'1080x1080')"
                alt="pro-image"
              /></td>
              <td>{{ slide.title }}</td>
              <td>{{ $dateFormat(slide.created_at) }}</td>
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
                        :to="'/slides/add?id=' + slide.id"
                      >
                        <i class="fal fa-edit"></i> Edit
                      </nuxt-link>
                      <a
                        class="dropdown-item"
                        @click="del(slide.id)"
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
      <!-- End Table -->
      <div
        class="kv-pagination d-flex flex-column flex-sm-row justify-content-sm-between align-items-center"
      >
        <div class="info">show from 1 to 10 of 25</div>
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
    </div>
  </div>
</template>

<script>
  import retrieveSlides from "~/mixins/retrieveSlides";
  export default {
    mixins: [retrieveSlides],
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
