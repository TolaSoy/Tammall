import { db, storage } from "@/services/firebase";

export const state = () => ({
  products: [],
  storeId: ''
});

export const actions = {
  setStoreId({ commit }, storeId) {
    commit("SET_STOREID", storeId);
  },
  async getProducts({ commit }, storeId) {
    const Product = db.collection(`stores/${storeId}/product`);
    
    let query = await Product.orderBy("created_at", "desc");
    // if (lastProduct) {
    //   query = query.startAfter(lastProduct);
    // }
    let data = await query.get();
    const payload = data.docs.map(item => {
      let id = item.id;
      let doc = item.data();
      return { id, ...doc };
    });
    commit("SET_PRODUCTS", payload);
  },
  async addProduct({ commit }, payload) {
    const Store = db.collection(`stores`);
    let query = await Store.doc(payload.storeId).get();
    let data = query.data();
    let store  = {
      id:data.id,
      name: data.name,
      banner: data.banner,
      profile:data.profile
    };
    payload.product.store = store;
    const Product = db.collection(`stores/${payload.storeId}/product`);
    let setProduct = payload.id ? Product.doc(payload.id) : Product.doc();
    let fileUpload = payload.product.image;
    if(typeof payload.product.price=="string"){
      payload.product.price = (+payload.product.price);
    }
    if(typeof payload.product.discount=="string"){
      payload.product.discount = (+payload.product.discount);
    }

    payload.product.price = (+payload.product.price);
    let width = null;
    let height = null;
    let allFileName = [];
    if (fileUpload) {
      for (let file of fileUpload) {
        if (typeof file == "object" && file.name) {
          let dt = new Date().getTime();
          let fileName = `tammall/products/${dt} - ${file.name}`;
          let singleFile = await storage.ref(fileName).put(file);
          let fullPath = await singleFile.ref.getDownloadURL();
          allFileName.push(fullPath);
        } else {
          allFileName.push(fileUpload.path);
        }
      }
    }
    payload.product.image = [];
    for(let picture of allFileName){
      let picdom = {
        height: height,
        path : picture,
        width: width
      };
      payload.product.image.push(picdom);
    }

    let specail = [];
    const specId = payload.product.spec.id;
    const Special = db.collection(`specs`).doc(specId).collection('special');
    const specspecial =await Special.get();
    specspecial.docs.map((item)=>{
      let data = item.data();
      specail.push(data);
    });

    payload.product.spec.specail = specail;
    payload.product.id = payload.id ? payload.id : setProduct.id;
    payload.product.code = payload.id ? payload.id : setProduct.id;
    await setProduct.set(payload.product);
  },
  async deleteProduct({ commit, dispatch }, payload) {
    const Product = db.collection(`stores/${payload.storeId}/product`); 
    await Product.doc(payload.id).delete();
  },

  async getProduct({ commit }, payload) {
    const Product = db.collection(`stores/${payload.storeId}/product`);
    let data = await Product.doc(payload.id).get();
    let product = data.data();
    return product;
  },

  async toggleStatus({ commit }, payload) {
    const Product = db.collection(`stores/${this.storeId}/product`);
    await Product.doc(payload.id).update({ status: !payload.status });
  }
};

export const mutations = {
  SET_PRODUCTS: (state, payload) => {
    state.products = payload;
  },
  SET_STOREID: (state, storeId) => {
    state.storeId = storeId;
  }
};
