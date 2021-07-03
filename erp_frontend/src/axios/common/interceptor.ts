import store from '@/store/index';

export function setInterceptors(instance: {
    interceptors: {
        request: {
            use: (
                arg0: (config: any) => any,
                arg1: (error: any) => Promise<never>
            ) => void;
        };
        response: {
            use: (
                arg0: (response: any) => any,
                arg1: (error: any) => Promise<never>
            ) => void;
        };
    };
}) {
    // Add a request interceptor
    instance.interceptors.request.use(
        function(config) {
            // Do something before request is sent
            console.log('store.state.loading.loading');
            store.state.loading.loading = true;
            //config.headers.Authorization = store.state.user.USER_TOKEN;
            return config;
        },
        function(error) {
            setTimeout(() => (store.state.loading.loading = false), 1000);
            // Do something with request error
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    instance.interceptors.response.use(
        function(response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            setTimeout(() => (store.state.loading.loading = false), 1000);

            return response;
        },
        function(error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            setTimeout(() => (store.state.loading.loading = false), 1000);

            return Promise.reject(error);
        }
    );
    return instance;
}
