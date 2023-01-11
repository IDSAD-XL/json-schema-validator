import React from 'react';
import {useAppDispatch} from "../Hooks/redux";
import {openModal} from "../Redux/ActionCreators";
import {modalTypes} from "../Redux/Reducers/ModalSlice";

const SignInForm = () => {
    const dispatch = useAppDispatch()

    const handleRegisterClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        dispatch(openModal(modalTypes.register))
    }

    const handleLoginClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        dispatch(openModal(modalTypes.login))
    }

    return (
        <>
            <label htmlFor="email" className="input-label">Email</label>
            <input type="email" className="input" id="email" />
            <label htmlFor="password" className="input-label">Password</label>
            <input type="password" className="input" id="password" />
            <button className="button">Log in</button>
            <p>Don’t have an account? <span className="link" onClick={handleRegisterClick}>Sign up here</span></p>
        </>
    );
};

export default SignInForm;