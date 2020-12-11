<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
      </ol>
    </nav>
    <!-- End breadcrumb -->
    <div class="kv-card p-4">
      <div class="row">
        <div class="col-md-6 col-lg-4 col-xl-3">
          <div class="d-flex align-items-center justify-content-center kv-widget">
            <div class="kv-widget-icon">
              <i class="fal fa-box-open"></i>
            </div>
            <div>
              <h5>{{totalProducts}} Products</h5>
              <small>Total Products</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Card Widget -->
    <div class="kv-card px-4 py-2">
      <div class="kv-card-title">
        <i class="fas fa-star"></i>
        Top view products
      </div>
      <div class="chart">Block Chart</div>
    </div>
    <!-- End Card Chart -->
  </div>
  <!-- End Content -->
</template>

<script>
import dashboard from "~/mixins/dashboard";
export default {
  mixins: [dashboard],
};
</script>

<style></style>
