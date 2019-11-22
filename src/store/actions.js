import Axios from "axios";

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
  }
};
