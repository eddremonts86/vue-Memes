import Axios from "axios";
import * as d3 from "d3";

export const actions = {
  putMedia({ state }, dataObj) {
    const urlBase = state.baseUrl + "/images";
    const data = Axios.put(urlBase, dataObj.obj);
    return data;
  },
  fetchUploadStatus({ state }, id) {
    const urlBase = state.baseUrl + "/images" + id;
    const data = Axios.get(urlBase, state.axiosConf);
    return data;
  },
  async fetchMemesForGraf({ state, commit }) {
    const urlBase = state.baseUrl + "/memes";
    const data = await d3.json(urlBase).catch(error => {
      // eslint-disable-next-line no-console
      console.error(
        "Cannot proceed with simulation, failed to  retrieve data. " + error
      );
    });
    commit("setMemes", data);
    return data;
  },
  async fetchMemes({ state, commit }) {
    const urlBase = state.baseUrl + "/memes";
    const data = await Axios.get(urlBase, state.axiosConf);
    commit("setMemes", data.data.items);
    return data.data.items;
  },
  async fetchMemesRoot({ state, commit }) {
    const urlBase = state.baseUrl + "/memes/root";
    const data = await Axios.get(urlBase, state.axiosConf);
    commit("setMemes", data.data.items);
    return data.data.items;
  },
  async fetchMemeByFamily({ state, commit }, options) {
    const urlBase =
      state.baseUrl + "/memes/" + options.id + "/" + options.options;
    const data = await Axios.get(urlBase, state.axiosConf);
    commit("setMemes", data.data.items);
    return data.data.items;
  },
  async fetchMemeByTags({ state, commit }, options) {
    const urlBase = state.baseUrl + "/memes?" + options.options;
    const data = await Axios.get(urlBase, state.axiosConf);
    commit("setMemes", data.data.items);
    return data.data.items;
  },
  async fetchTags({ state, commit }) {
    const urlBase = state.baseUrl + "/tags";
    const data = await Axios.get(urlBase, state.axiosConf);
    commit("setTags", data.data);
    return data.data;
  },
  postMemes({ state }, dataObj) {
    const urlBase = state.baseUrl + "/memes";
    const data = Axios.post(urlBase, dataObj);
    return data;
  },
  postTags({ state }, dataObj) {
    const urlBase = state.baseUrl + "/tags";
    const data = Axios.post(urlBase, dataObj);
    return data;
  }
};
