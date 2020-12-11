import { auth, db } from "@/services/firebase";
import Cookie from "js-cookie";

const UserDetail = db.collection("userdetail");
const Store = db.collection("stores");

export const state = () => ({
  storeData: {},
  user: null,
  detail: null
});

export const actions = {
  async login({ commit, dispatch }, account) {
    try {
      await auth.signInWithEmailAndPassword(account.email, account.password);
      const token = await auth.currentUser.getIdToken();
      Cookie.set("access_token", token);
      dispatch('getDetail', auth.currentUser)
    } catch (error) {
      throw error;
    }
  },

  async getDetail({ commit, dispatch },{ email, uid, displayName, photoURL }) {
    try {
      const userDetial = await UserDetail.where("id", "==", uid).get();
      const detail = userDetial.docs[0].data();
      let admin = detail.permission.includes('root');
      let owner = detail.permission.includes('tammall');
      if(admin || owner){
        if(!admin){
          dispatch("getStoreByUsername", detail.username);
        }
        commit("SET_USER", { email, uid, displayName, photoURL });
      }else {
        await auth.signOut();
        await this.$router.push("/auth/login");
      }
      commit("SET_DETAIL", detail);
    }catch (error) {
      throw error
    }
  },

  async getStoreByUsername({ commit }, username) {
    try {
      const queryData = await Store.where("member", 'array-contains',username).get();
      const userStore = queryData.docs[0].data();
      commit("SET_STOREDATA",userStore);
    }catch (error) {
      throw error
    }
  },
  async signOut() {
    await auth.signOut();
  }
};

export const mutations = {
  SET_STOREDATA: (state, payload) => {
    Object.assign(state.storeData, payload)
  },
  SET_USER: (state, account) => {
    state.user = account;
  },
  SET_DETAIL: (state, detail) => {
    state.detail = detail;
  }
};

export const getters  = {
  getUserStoreId:(state)=>{
    const {id} =state.storeData
    return id
  }
}
