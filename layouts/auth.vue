<template>
    <nuxt />
</template>

<script>
export default {};
</script>

<style lang="scss">
.kv-auth-fluid {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-height: 100vh;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  background: url('~static/assets/images/bg-auth.jpg') center;
  background-size: cover;
 .kv-auth-fluid-form-box {
  max-width: 480px;
  border-radius: 0;
  z-index: 2;
  padding: 3rem 2rem;
  background-color: var(--bg);
  position: relative;
  width: 100%;
  .form-group {
   label {
    font-size: 14px;
   }
   .form-control {
    border: 1px solid #dee2e6;
    &:focus{
     box-shadow: none;
    }
   }
  }
  .kv-auth-brand {
   display: flex;
   align-items: center;
   margin-bottom: 5rem;
   span {
    font-size: 2rem;
    font-weight: 700;
    margin-left: 1rem;
   }
  }
  h4 {
   color: var(--color-primary);
   font-weight: 700;
   font-size: 1rem;
  }
 }
 .kv-auth-fluid-right {
   padding: 6rem 3rem;
   -webkit-box-flex: 1;
   -ms-flex: 1;
   flex: 1;
   position: relative;
   color: #fff;
   background-color: rgba(0,0,0,.3);
   .kv-auth-user-testimonial {
    position: absolute;
    margin: 0 auto;
    padding: 0 1.75rem;
    bottom: 3rem;
    left: 0;
    right: 0;
    p.lead {
     font-size: 1.125rem;
     margin: 0 auto 20px auto;
     max-width: 700px;
     padding: 0rem 2rem;
     // position: relative;
     i {
      font-size: 12px;
     }
    }
   }
 }
}
@media (max-width: 991.98px) { 
 .kv-auth-fluid {
  .kv-auth-fluid-form-box {
    max-width: 100%;
    min-height: 100vh;
  }
  .kv-auth-fluid-right {
   display: none;
  }
 }
}
</style>