import { axiosService } from './axios.service';
import { urls } from '../configs/urls';

export const userService = {
    getById: (id) => axiosService.get(`${urls.users}/${id}`).then(value => value.data)
};