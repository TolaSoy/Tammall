import {db, storage} from "@/services/firebase";
// const storeId = 'SMpaHgreAgj9trR4f1Wy';
// const Specs = db.collection(`store/${storeId}/spec`);
const Spec = db.collection(`specs`);

export const state = () => ({
  specs: []
});

export const mutations = {
  SET_SPECS: (state, payload) => {
    state.specs = payload;
  },
};
export const actions = {

  async getSpecs({ commit })
  {
    const data = await Spec.orderBy("name").get();
    const payload = data.docs.map(item => {
      let id = item.id;
      let doc = item.data();
      return { id, ...doc };
    });
    commit("SET_SPECS", payload);
  },


  async addSpec({ commit }, payload)
  {
    let setSpec = payload.id ? Spec.doc(payload.id) : Spec.doc();
    let specId = payload.id ? payload.id : setSpec.id;
    let newsubspec = [];
    let newsubfile = {};
    console.log("Hello word");
    for(const item of payload.cachespec){
      let allFileName ='';
      let height = null;
      let width = null;
      console.log("Hello word");
      if (item.icon) {
        if (typeof item.icon == "object") {
          let dt = new Date().getTime();
          let fileName = `tammall/specs/${dt} - ${item.icon.name}`;
          let singleFile = await storage.ref(fileName).put(item.icon);
          let fullPath = await singleFile.ref.getDownloadURL();
          allFileName = fullPath;
        } else {
          allFileName = fileUpload.path;
        }
      }
      newsubfile = {
        height: height,
        path : allFileName,
        width: width
     };

     await Spec.doc(specId).collection('special').doc().set({
      'de_spec' : item.de_spec,
      'value' : item.value,
      'icon' : newsubfile
     });
     
    }
  
    payload.spec.id = payload.id ? payload.id : setSpec.id;
    
    await setSpec.set(payload.spec);
  },

  async deleteSpec({ commit }, id)
  {
    await Spec.doc(id).delete();
  },
  async getSpec({ commit }, id)
  {
    let data = await Spec.doc(id).get();
    let payload = data.data();
    return payload;
  }
};

