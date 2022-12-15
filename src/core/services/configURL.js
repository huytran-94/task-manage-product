import axios from "axios";
// const BASE_URL = "https://json-server-blond.vercel.app";
// const BASE_URL = "http://localhost:4000";
const BASE_URL = "https://63917e74b750c8d178c4c3ec.mockapi.io/";

const BASE_USER_URL = `${BASE_URL}`;

const AXIOS_INSTANCE_GENERATOR = (BASE_URL) => {
  let config = {
    baseURL: BASE_URL,
  };

  return axios.create(config);
};

export { AXIOS_INSTANCE_GENERATOR, BASE_USER_URL };
