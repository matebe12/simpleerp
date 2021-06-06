import axios from 'axios';
import { AxiosInstance } from 'axios';

export default class AxiosService {
    static readonly instance: AxiosInstance = axios.create({
        baseURL: ' http://localhost:3000/graphql',
        timeout: 100000,
    });
}
