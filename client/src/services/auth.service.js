import { axiosService } from './axios.service';
import { urls } from '../configs/urls';

export const authService = {
    login: (email, password) => axiosService
        .post(urls.login, {email, password})
        .then(value => value.data),

    checkIsAuth: () => axiosService.get(urls.refresh).then(value => value.data),

    logout: () => axiosService.post(urls.logout)
};