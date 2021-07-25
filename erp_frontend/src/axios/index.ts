import axios from 'axios';
import { AxiosInstance } from 'axios';
import store from '@/store/index';
const instance: AxiosInstance = axios.create({
    baseURL: ' http://localhost:3000/graphql',
    timeout: 100000,
});

instance.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        //config.headers.Authorization = store.state.user.USER_TOKEN;
        return config;
    },
    function(error) {
        setTimeout(() => (store.state.loading.loading = false), 0);
        // Do something with request error
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        setTimeout(() => (store.state.loading.loading = false), 0);

        return response;
    },
    function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        setTimeout(() => (store.state.loading.loading = false), 0);

        return Promise.reject(error);
    }
);

export default instance;

// export default class AxiosService {
//     static readonly instance: AxiosInstance = axios.create({
//         baseURL: ' http://localhost:3000/graphql',
//         timeout: 100000,
//     });
// }
