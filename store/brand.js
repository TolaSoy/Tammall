import {db, storage} from "@/services/firebase";
const Brand = db.collection(`brands`);

export const state = () => ({
  brands: []
});

export const actions = {
  async getBrands({ commit }) {
    const data = await Brand.orderBy("name").get();
    const payload = data.docs.map(item => {
      let id = item.id;
      let doc = item.data();
      return { id, ...doc };
    });
    commit("SET_BRANDS", payload);
  },


  async addBrand({ commit }, payload) {
    let setBrand = payload.id ? Brand.doc(payload.id) : Brand.doc();
    let fileUpload = payload.brand.image;
    let allFileName = null;
    let width = null;
    let height = null;
    if (fileUpload) {
      if (typeof fileUpload == "object" && fileUpload.name) {
        let dt = new Date().getTime();
        let fileName = `tammall/brands/${dt} - ${fileUpload.name}`;
        let singleFile = await storage.ref(fileName).put(fileUpload);
        let fullPath = await singleFile.ref.getDownloadURL();
        allFileName = fullPath;
      } else {
        allFileName = fileUpload.path;
      }
    }
    payload.brand.id = payload.id ? payload.id : setBrand.id;
    payload.brand.image = {
       height: height,
       path : allFileName,
       width: width
    };

    await setBrand.set(payload.brand);
  },

  async deleteBrand({ commit }, id) {
    await Brand.doc(id).delete();
  },
  async getBrand({ commit }, id) {
    let data = await Brand.doc(id).get();
    let payload = data.data();
    return payload;
  }
};

export const mutations = {
  SET_BRANDS: (state, payload) => {
    state.brands = payload;
  }
};
