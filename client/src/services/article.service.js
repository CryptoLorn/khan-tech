import { authAxiosService, axiosService } from './axios.service';
import { urls } from '../configs/urls';

export const articleService = {
    getAll: (limit, page) => axiosService
        .get(urls.articles, {params: {limit, page}})
        .then(value => value.data),

    updateById: (id, article) => authAxiosService
        .put(`${urls.articles}/${id}`, article)
        .then(value => value.data)
};