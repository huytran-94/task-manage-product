import { AXIOS_INSTANCE_GENERATOR, BASE_USER_URL } from "./configURL";

const CUSTOMER_SERVICE = {
  getCustomerList: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(
      `/customers`
    );
    return data;
  },
  getCustomerInfo: async (id) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(
      `/customers/${id}`
    );
    return data;
  },
  deleteCustomer: async (customerId) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).delete(
      `/customers/${customerId}`
    );
    return data;
  },
  updateCustomer: async (customerId, newData) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).put(
      `/customers/${customerId}`,
      newData
    );
    return data;
  },
  addCustomer: async (newData) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).post(
      `/customers`,
      newData
    );
    return data;
  },
};

export default CUSTOMER_SERVICE;
