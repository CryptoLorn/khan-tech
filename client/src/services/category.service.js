import { axiosService } from './axios.service';
import { urls } from '../configs/urls';

export const categoryService = {
    getById: (id) => axiosService.get(`${urls.categories}/${id}`).then(value => value.data)
};