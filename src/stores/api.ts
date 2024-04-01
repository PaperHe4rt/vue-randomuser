import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://randomuser.me/api/',
});

export const apiService = {
  async get(parameter: string) {
    try {
      const res = await axiosInstance.get(parameter);
      return res;
    } catch (error) {
      return error;
    }
  },
};
