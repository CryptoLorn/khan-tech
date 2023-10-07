import { axiosService } from './axios.service';
import { urls } from '../configs/urls';

export const articleService = {
    getAll: () => axiosService.get(urls.articles).then(value => value.data)
};