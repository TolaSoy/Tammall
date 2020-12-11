import {db, storage} from "@/services/firebase";

export const state = () => ({
  subbrands: [],
  storeId:''
});

export const actions = {
  async getSubBrands({ commit },storeId) {
    const Brand = db.collection(`stores/${storeId}/brand`);
    const data = await Brand.orderBy("name").get();
    const payload = data.docs.map(item => {
      let id = item.id;
      let doc = item.data();
      return { id, ...doc };
    });
    commit("SET_CATEGORIES", payload);
  },
  async addSubBrand({ commit }, payload) {
    const Brand = db.collection(`stores/${payload.id}/brand`);
    let setSubBrand = Brand.doc(payload.addSubBrand.id);
    await setSubBrand.set(payload.addSubBrand);
  },
  async deleteSubBrand({ commit }, teamId) {
    const Category = db.collection(`stores/${teamId.storeId}/brand`);
    await Category.doc(teamId.id).delete();
  },
};

export const mutations = {
  SET_CATEGORIES: (state, payload) => {
    state.subbrands = payload;
  }
};
