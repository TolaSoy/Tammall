import {db, storage} from "@/services/firebase";
const Slide = db.collection(`slides`);

export const state = () => ({
  slides: []
});

export const actions = {
  async getSlides({ commit }) {
    const data = await Slide.orderBy("title").get();
    const payload = data.docs.map(item => {
      let id = item.id;
      let doc = item.data();
      return { id, ...doc };
    });
    commit("SET_SLIDES", payload);
  },


  async addSlide({ commit }, payload) {
    let setSlide = payload.id ? Slide.doc(payload.id) : Slide.doc();
    let fileUpload = payload.slide.image;
    let allFileName = null;
    let width = null;
    let height = null;
    if (fileUpload) {
      if (typeof fileUpload == "object" && fileUpload.name) {
        let dt = new Date().getTime();
        let fileName = `tammall/slides/${dt} - ${fileUpload.name}`;
        let singleFile = await storage.ref(fileName).put(fileUpload);
        let fullPath = await singleFile.ref.getDownloadURL();
        allFileName = fullPath;
      } else {
        allFileName = fileUpload.path;
      }
    }
    payload.slide.id = payload.id ? payload.id : setSlide.id;
    payload.slide.image = {
      height: height,
      path : allFileName,
      width: width
    };

    await setSlide.set(payload.slide);
  },

  async deleteSlide({ commit }, id) {
    await Slide.doc(id).delete();
  },
  async getSlide({ commit }, id) {
    let data = await Slide.doc(id).get();
    let payload = data.data();
    return payload;
  }
};

export const mutations = {
  SET_SLIDES: (state, payload) => {
    state.slides = payload;
  }
};
