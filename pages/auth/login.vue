<template>
  <div class="kv-auth-fluid">
    <div class="kv-auth-fluid-form-box">
      <div class="align-items-center d-flex h-100">
        <div class="card-body">
          <div class="kv-auth-brand justify-content-center justify-content-lg-start">
            <img src="/assets/images/logo.png" alt="logo" />
            <span>Tammall</span>
          </div>
          <h4 class="mt-0 mb-4">Pleas Sign In</h4>
          <p class="text-muted mb-4">Enter your email address and password to access account.</p>
          <form @submit.prevent="onLogin">
            <div class="form-group">
              <label for="emailaddress">Email address</label>
              <input
                class="form-control"
                type="email"
                id="emailaddress"
                required
                placeholder="Enter your email"
                v-model="account.email"
              />
            </div>
            <div class="form-group">
              <a href class="text-muted float-right">
                <small>Forgot your password?</small>
              </a>
              <label for="password">Password</label>
              <input
                class="form-control"
                type="password"
                required
                id="password"
                placeholder="Enter your password"
                v-model="account.password"
              />
            </div>
            <div class="form-group mb-3">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox-signin" />
                <label class="custom-control-label" for="checkbox-signin">Remember me</label>
              </div>
            </div>
            <div class="form-group mb-0 text-center">
              <!-- <nuxt-link to="/" class="btn btn-warning btn-block text-white" type="submit"> SIGN IN </nuxt-link> -->
              <button class="btn btn-warning btn-block text-white" type="submit">SIGN IN</button>
            </div>
            <div class="error" v-if="isError">{{ errMsg }}</div>
          </form>
        </div>
      </div>
    </div>
    <div class="kv-auth-fluid-right text-center">
      <div class="kv-auth-user-testimonial">
        <h2 class="mb-3">KRAVANH ECO</h2>
        <p class="lead d-flex justify-content-center">
          <i class="fal fa-quote-left mr-2"></i>
          It's a elegent templete. I love it very much! .
          <i
            class="fal fa-quote-right ml-2"
          ></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "@/services/firebase";
import loadingSpin from "~/mixins/loadingSpin";
import {mapActions} from 'vuex'
export default {
  middleware: ['isLoggedIn'],
  mixins: [loadingSpin],
  head() {
    return {
      titleTemplate: "Login - Tammall",
    };
  },
  data() {
    return {
      account: {
        email: "",
        password: "",
      },
      isError: "",
      errMsg: "",
    };
  },
  methods: {
    ...mapActions('users', ['login']),
    async onLogin() {
      this.$nextTick(async () => {
        await this.startLoading();
        try{
          await this.login(this.account)
        }catch (error) {
          this.isError = true;
          this.errMsg = error.code;
        }
        finally {
          await this.finishLoading();
          location.href = '/'
          // await this.$router.push({path: '/'})
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  color: red;
}
</style>
