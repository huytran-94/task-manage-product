import { AXIOS_INSTANCE_GENERATOR, BASE_USER_URL } from "./configURL";

const ADMIN_SERVICE = {
  getAdminInfo: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(`/admin`);
    return data;
  },
  getUserInfo: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(`/users`);
    return data;
  },
  addAdminInfo: async (newData) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).post(
      `/admin`,
      newData
    );
    return data;
  },

  deleteUser: async (userId) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).delete(
      `/users/${userId}`
    );
    return data;
  },
  updateUser: async (userId, newData) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).put(
      `/users/${userId}`,
      newData
    );
    return data;
  },

  getSingleUserInfo: async (id) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(
      `/users/${id}`
    );
    return data;
  },

  checkMasterInfo: async (userData) => {
    let queryParams = { email: userData.email, password: userData.password };
    const params = new URLSearchParams(queryParams);
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(
      `/master?${params}`
    );
    return data;
  },
};

export default ADMIN_SERVICE;
