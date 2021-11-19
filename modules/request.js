import axios from "axios";


const instance = axios.create({});
const ApiService = {
  async get(url, data) {
    try {
      const res = await instance.get(url, data);
      return res;
    } catch (reason) {
      return await Promise.reject(reason);
    }
  },

  async post(url, data) {
    try {
      const res = await instance.post(url, data);
      return res;
    } catch (reason) {
      return await Promise.reject(reason);
    }
  },

  async put(url, data) {
    try {
      const res = await instance.put(url, data);
      return res;
    } catch (reason) {
      return await Promise.reject(reason);
    }
  },

  async delete(url) {
    try {
      const res = await instance.delete(url);
      return res;
    } catch (reason) {
      return await Promise.reject(reason);
    }
  },

  awaitAll() {
    return axios
      .all(Array.from(arguments))
      .then(axios.spread((...responses) => responses))
      .catch((reasons) => Promise.reject(reasons));
  },
};

export default ApiService;
