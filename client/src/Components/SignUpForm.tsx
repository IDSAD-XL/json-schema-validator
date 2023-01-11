import React from 'react';
import {useAppDispatch} from "../Hooks/redux";
import {openModal} from "../Redux/ActionCreators";
import {modalTypes} from "../Redux/Reducers/ModalSlice";

const SignInForm = () => {
    const dispatch = useAppDispatch()

    const handleLoginClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        dispatch(openModal(modalTypes.login))
    }

    return (
        <>
            <label htmlFor="email" className="input-label">Name</label>
            <input type="text" className="input" id="Name" />
            <label htmlFor="email" className="input-label">Email</label>
            <input type="text" className="input" id="email" />
            <label htmlFor="password" className="input-label">Password</label>
            <input type="password" className="input" id="password" />
            <button className="button">Sign Up</button>
            <p>Already have an account? <span className="link" onClick={handleLoginClick}>Log in here</span></p>
        </>
    );
};

export default SignInForm;