import {db, storage} from "@/services/firebase";
const Category = db.collection(`categories`);

export const state = () => ({
  categories: []
});

export const actions = {
  async getCategories({ commit }) {
    const data = await Category.orderBy("name").get();
    const payload = data.docs.map(item => {
      let id = item.id;
      let doc = item.data();
      return { id, ...doc };
    });
    commit("SET_CATEGORIES", payload);
  },
  async addCategory({ commit }, payload) {
    let setCategory = payload.id ? Category.doc(payload.id) : Category.doc();
    let fileUpload = payload.category.image;
    let allFileName = '';
    let width = null;
    let height = null;
    if (fileUpload) {
      if (typeof fileUpload == "object" && fileUpload.name) {
        let dt = new Date().getTime();
        let fileName = `tammall/categories/${dt} - ${fileUpload.name}`;
        let singleFile = await storage.ref(fileName).put(fileUpload);
        let fullPath = await singleFile.ref.getDownloadURL();
        allFileName = fullPath;
      } else {
        allFileName = fileUpload.path;
      }
    }
    payload.category.id = payload.id ? payload.id : setCategory.id;
    payload.category.image = {
      height: height,
      path : allFileName,
      width: width
    };
    await setCategory.set(payload.category);
  },
  async deleteCategory({ commit }, id) {
    await Category.doc(id).delete();
  },
  async getCategory({ commit }, id) {
    let data = await Category.doc(id).get();
    let payload = data.data();
    return payload;
  }
};

export const mutations = {
  SET_CATEGORIES: (state, payload) => {
    state.categories = payload;
  }
};
