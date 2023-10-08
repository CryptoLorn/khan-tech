import React from 'react';

import './UpdateForm.css';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {authValidator} from "../../validations/auth.validator";

const UpdateForm = () => {
    //{resolver: joiResolver(authValidator.login)}
    const {register, handleSubmit, formState: {errors}} = useForm();

    const update = async (data) => {
        console.log(data)
    }

    const users = ['Tania', 'Sasha', 'Andrii']

    return (
        <div className={'update_form_wrapper'}>
            <div className={'update_form_input'}>
                <input type={'text'} {...register('title')} />
                <input type={'text'} {...register('description')} />
                <input type={'number'} {...register('time')} />
                <select {...register('category')}>
                    {users.map((user, index) => <option key={index}>{user}</option>)}
                </select>
                <select {...register('author')}>
                    <option>Choise</option>
                </select>
            </div>
            <div className={'update_form_btn'} onClick={handleSubmit(update)}>Update</div>
        </div>
    );
};

export default UpdateForm;