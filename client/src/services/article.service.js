import { axiosService } from './axios.service';
import { urls } from '../configs/urls';

export const articleService = {
    getAll: (limit, page) => axiosService
        .get(urls.articles, {params: {limit, page}})
        .then(value => value.data)
};