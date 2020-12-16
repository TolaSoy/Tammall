<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Specs</li>
      </ol>
    </nav>
    <div class="kv-card">
      <div class="kv-card-header">
        <div class="row justify-content-between">
          <div class="col-12 col-sm-6 col-lg-4">
            <form>
              <div class="form-group mb-0">
                <label for="exampleInputEmail1">Search Specs</label>
                <input type="text" class="form-control" id="search" v-b-modal="search"/>
              </div>
            </form>
          </div>
          <div class="col-12 col-sm-6 text-right align-self-end">
            <nuxt-link to="/specs/add" class="btn btn-primary">
              <i class="fal fa-plus-circle"></i>
              Add New Specs
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table kv-table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Specs name</th>
            <th scope="col">Specs code</th>
            <th scope="col">Create Date</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(spec, index) in specs" :key="index">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ spec.name }}</td>
            <td><p v-html="spec.code"></p></td>
            <td>{{ $dateFormat(spec.created_at) }}</td>
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
                      :to="'/spec/add?id=' + spec.id"
                    >
                      <i class="fal fa-edit"></i> Edit
                    </nuxt-link>
                    <button
                      class="dropdown-item"
                      @click="del(spec.id)"
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
  import retrieveSpec from "~/mixins/retrieveSpec";
  export default {
    mixins: [retrieveSpec]
  };
</script>
