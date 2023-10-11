import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import './UpdateForm.css';
import './media.css';
import { articleActions } from '../../store/slices/article.slice';
import { articleValidator } from '../../validations/article.validator';

const UpdateForm = () => {
    const {articleForUpdate, error} = useSelector(state => state.article);
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm(
        {resolver: joiResolver(articleValidator.update)});

    useEffect(() => {
        if (articleForUpdate) {
            setValue('title', articleForUpdate.title);
            setValue('description', articleForUpdate.description);
            setValue('time', articleForUpdate.time);
        }
    }, [articleForUpdate]);

    const selectFile = e => {
        setFile(e.target.files[0]);
    }

    const update = async (data) => {
        const formData = new FormData();
        formData.append('img', file);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('time', data.time);

        await dispatch(articleActions.updateById({id: articleForUpdate.id, article: formData}));
        reset();
    };

    return (
        <div className={'update_form_wrapper'}>
            <div className={'update_form'}>
                <form className={'update_form_input'}>
                    <input type={'text'} placeholder={'title'} {...register('title')} />
                    {errors.title?.message &&
                        <span className={'update_form_error'}>
                            {errors.title.message}
                        </span>
                    }

                    <input type={'text'} placeholder={'description'} {...register('description')} />
                    {errors.description?.message &&
                        <span className={'update_form_error'}>
                            {errors.description.message}
                        </span>
                    }

                    <input type={'number'} placeholder={'time'} {...register('time')} />
                    {errors.time?.message &&
                        <span className={'update_form_error'}>
                            {errors.time.message}
                        </span>
                    }
                </form>
                {error && <span className={'update_form_error'}>{error.message}</span>}
                <input type={'file'} onChange={selectFile} />
            </div>
            <div
                className={articleForUpdate ? 'update_form_btn' : 'update_form_btn_disable'}
                onClick={handleSubmit(update)}
            >
                Update
            </div>
        </div>
    );
};

export default UpdateForm;