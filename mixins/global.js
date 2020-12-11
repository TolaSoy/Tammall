export default {
  methods: {
    toObject(obj) {
      if (typeof obj == "object") {
        return JSON.parse(JSON.stringify(obj));
      }
    }
  }
};
