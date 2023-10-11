import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import './CreateForm.css';
import './media.css';
import { userActions } from '../../store/slices/user.slice';
import { categoryActions } from '../../store/slices/category.slice';
import { articleActions } from '../../store/slices/article.slice';
import { articleValidator } from '../../validations/article.validator';

const CreateForm = () => {
    const {users} = useSelector(state => state.user);
    const {categories} = useSelector(state => state.category);
    const {error} = useSelector(state => state.article);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const {register, handleSubmit, reset, formState: {errors}} = useForm(
        {resolver: joiResolver(articleValidator.create)}
    );

    useEffect(() => {
        dispatch(userActions.getAll());
        dispatch(categoryActions.getAll());
    }, []);

    const selectFile = e => {
        setFile(e.target.files[0]);
    }

    const createArticle = async (data) => {
        const formData = new FormData();
        formData.append('img', file);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('time', data.time);
        formData.append('categoryId', data.category);
        formData.append('userId', data.author);

        await dispatch(articleActions.create({article: formData}));
        reset();
    }

    return (
        <div className={'create_form_wrapper'}>
            <div className={'create_form'}>
                <div className={'create_form_input_file'}>
                    <form className={'create_form_input'}>
                        <input type={'text'} placeholder={'title'} {...register('title')} />
                        {errors.title?.message &&
                            <span className={'create_form_error'}>
                                {errors.title.message}
                            </span>
                        }

                        <input type={'text'} placeholder={'description'} {...register('description')} />
                        {errors.description?.message &&
                            <span className={'create_form_error'}>
                                {errors.description.message}
                            </span>
                        }

                        <input type={'number'} placeholder={'time'} {...register('time')} />
                        {errors.time?.message &&
                            <span className={'create_form_error'}>
                                {errors.time.message}
                            </span>
                        }

                        <select {...register('category')}>
                            <option></option>
                            {
                                categories &&
                                categories.map(category =>
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                )}
                        </select>
                        <select {...register('author')}>
                            <option></option>
                            {
                                users && users.map(user =>
                                    <option
                                        key={user.id}
                                        value={user.id}
                                    >
                                        {user.full_name}
                                    </option>
                                )}
                        </select>
                    </form>
                    <input type={'file'} onChange={selectFile} />
                    {error && <span className={'create_form_error'}>{error.message}</span>}
                </div>
                <div
                    className={'create_form_btn'}
                    onClick={handleSubmit(createArticle)}
                >
                    Create
                </div>
            </div>
        </div>
    );
};

export default CreateForm;