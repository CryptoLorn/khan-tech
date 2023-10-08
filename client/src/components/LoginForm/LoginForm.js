import React from 'react';
import {useForm} from 'react-hook-form';

import './LoginForm.css';

const LoginForm = () => {
    //{resolver: joiResolver(AuthValidator)}
    const {register, handleSubmit, formState: {errors}} = useForm();

    const submit = (data) => {
        console.log(data);
    }

    return (
        <div className={'login_form_wrapper'} onClick={handleSubmit(submit)}>
            <div className={'login_form'}>
                <input type={'email'} {...register('email')}/>
                <input type={'password'} {...register('password')}/>
            </div>
            <div className={'login_btn'}>Login</div>
        </div>
    );
};

export default LoginForm;