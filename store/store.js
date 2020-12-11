import { db, storage } from "@/services/firebase";
const Store = db.collection(`stores`);
const UserDetail = db.collection("userdetail");

export const state = () => ({
  stores: []
});

export const actions = {
  async getStores({ commit }, lastProduct = "") {
    let query = await Store.orderBy("created_at", "desc");
    if (lastProduct) {
      query = query.startAfter(lastProduct);
    }
    let data = await query.get();
    const payload = data.docs.map(item => {
      let id = item.id;
      let doc = item.data();
      return { id, ...doc };
    });
    commit("SET_STORES", payload);
  },
  async addStore({ commit }, payload) {
    let setStore = payload.id ? Store.doc(payload.id) : Store.doc();
    let fileUploadProfile = payload.store.profile;
    let fileUploadBanner = payload.store.banner;
    let allFileNameProfile = null;
    let allFileNameBanner = null;
    let width = null;
    let height = null;
    if (fileUploadProfile) {
      if (typeof fileUploadProfile == "object" && fileUploadProfile.name) {
        let dt = new Date().getTime();
        let fileName = `tammall/stores/${dt} - ${fileUploadProfile.name}`;
        let singleFile = await storage.ref(fileName).put(fileUploadProfile);
        let fullPath = await singleFile.ref.getDownloadURL();
        allFileNameProfile = fullPath;
      } else {
        allFileNameProfile = fileUploadProfile.path;
      }
    }
    if (fileUploadBanner) {
      if (typeof fileUploadBanner == "object" && fileUploadBanner.name) {
        let dt = new Date().getTime();
        let fileName = `tammall/stores/${dt} - ${fileUploadBanner.name}`;
        let singleFile = await storage.ref(fileName).put(fileUploadBanner);
        let fullPath = await singleFile.ref.getDownloadURL();
        allFileNameBanner = fullPath;
      }else{
        allFileNameBanner = fileUploadBanner.path;
      }
    }
    let querycheck = await UserDetail.doc(payload.store.user.username).get();
    console.log('querycheck',querycheck.data()['permission']);
    let query = await UserDetail.doc(payload.store.user.username).update({
      'permission': ["tammall"]
    });
    payload.store.id = payload.id ? payload.id : setStore.id;
    payload.store.profile = {
      height: height,
      path : allFileNameProfile,
      width: width
    };
    payload.store.banner = {
      height: height,
      path : allFileNameBanner,
      width: width
    };
    await setStore.set(payload.store);
  },
  async deleteStore({ commit, dispatch }, id) {
    let product = await dispatch("getStore", id);
    let productImagesprofile = product.profile.path;
    let productImagesBanner = product.banner.path;
    if (productImagesprofile) {
        await storage.refFromURL(productImagesprofile).delete();
    }
    if (productImagesBanner) {
      await storage.refFromURL(productImagesBanner).delete();
    }
    await Store.doc(id).delete();
  },
  async getStore({ commit }, id) {
    let data = await Store.doc(id).get();
    let payload = data.data();
    return payload;
  },
  async toggleStatus({ commit }, payload) {
    await Store.doc(payload.id).update({ status: !payload.status });
  }
};

export const mutations = {
  SET_STORES: (state, payload) => {
    state.stores = payload;
  }
};
