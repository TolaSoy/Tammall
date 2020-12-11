import {db, storage} from "@/services/firebase";

export const state = () => ({
  subspecs: [],
  storeId:''
});

export const actions = {
  async getSubSpecs({ commit },storeId) {
    const Spec = db.collection(`stores/${storeId}/spec`);
    const data = await Spec.orderBy("name").get();
    const payload = data.docs.map(item => {
      let id = item.id;
      let doc = item.data();
      return { id, ...doc };
    });
    commit("SET_CATEGORIES", payload);
  },

  async addSubSpec({ commit }, payload) {
    const Spec = db.collection(`stores/${payload.id}/spec`);
    let setSubSpec = Spec.doc(payload.addSubSpec.id);
    await setSubSpec.set(payload.addSubSpec);
  },

  async deleteSubSpec({ commit }, teamId) {
    const Spec = db.collection(`stores/${teamId.storeId}/spec`);
    await Spec.doc(teamId.id).delete();
  },
};

export const mutations = {
  SET_CATEGORIES: (state, payload) => {
    state.subspecs = payload;
  }
};
