import { axiosService } from './axios.service';
import { urls } from '../configs/urls';
import { USER } from '../constants/role.enum';
import { ACCESS_TOKEN } from '../constants/token.enum';

export const authService = {
    login: (email, password) => axiosService
        .post(urls.login, {email, password})
        .then(value => value.data),

    registration: (email, password) => axiosService.post(urls.registration, {email, password, role: USER})
        .then(value => {
            localStorage.setItem(ACCESS_TOKEN, value.data.access_token);
            return value.data.user;
        }
    ),

    checkIsAuth: () => axiosService.get(urls.refresh).then(value => value.data),

    logout: () => axiosService.post(urls.logout)
        .then(value => localStorage.removeItem(ACCESS_TOKEN))
};