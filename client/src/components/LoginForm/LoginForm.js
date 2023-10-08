import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import './LoginForm.css';
import { authActions, setError } from '../../store/slices/auth.slice';
import { authValidator } from '../../validations/auth.validator';
import { ADMIN } from '../../constants/role.enum';

const LoginForm = () => {
    const {error} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm(
        {resolver: joiResolver(authValidator.login)});
    const navigate = useNavigate();

    const submit = async (data) => {
        await dispatch(authActions.login({email: data.email, password: data.password}))
            .then(data => {
                if (data.payload.user?.role === ADMIN) {
                    navigate('/admin/dashboard');
                } else {
                    dispatch(setError({message: 'No access'}));
                }
            })
    };

    return (
        <div className={'login_form_wrapper'}>
            <div className={'login_form_sub'}>
                <div className={'login_form'}>
                    <input type={'email'} {...register('email')}/>
                    <input type={'password'} {...register('password')}/>
                </div>
                <div className={'error'}>
                    {errors.email && <span className={'error_message'}>{errors.email.message}</span>}
                    {errors.password && <span className={'error_message'}>{errors.password.message}</span>}
                    {error && <span className={'error_message'}>{error.message}</span>}
                </div>
                <div className={'login_btn'} onClick={handleSubmit(submit)}>Login</div>
            </div>
        </div>
    );
};

export default LoginForm;