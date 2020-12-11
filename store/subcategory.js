import {db, storage} from "@/services/firebase";

export const state = () => ({
  subcategories: [],
  storeId:''
});

export const actions = {
  async getSubCategories({ commit },storeId) {
    const Category = db.collection(`stores/${storeId}/category`);
    const data = await Category.orderBy("name").get();
    const payload = data.docs.map(item => {
      let id = item.id;
      let doc = item.data();
      return { id, ...doc };
    });
    commit("SET_CATEGORIES", payload);
  },
  async addSubCategory({ commit }, payload) {
    const Category = db.collection(`stores/${payload.id}/category`);
    let setCategory = Category.doc(payload.addSubcagory.id);
    await setCategory.set(payload.addSubcagory);
  },
  async deleteSubCategory({ commit }, teamId) {
    const Category = db.collection(`stores/${teamId.storeId}/category`);
    await Category.doc(teamId.id).delete();
  },
};

export const mutations = {
  SET_CATEGORIES: (state, payload) => {
    state.subcategories = payload;
  }
};
