import { axiosService } from './axios.service';
import { urls } from '../configs/urls';

export const categoryService = {
    getAll: () => axiosService.get(urls.categories).then(value => value.data),

    getById: (id) => axiosService.get(`${urls.categories}/${id}`).then(value => value.data)
};