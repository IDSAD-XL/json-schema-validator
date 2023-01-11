import React from 'react';
import {useAppDispatch, useAppSelector} from "../Hooks/redux";
import {modalTypes} from "../Redux/Reducers/ModalSlice";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import {closeModal} from "../Redux/ActionCreators";

const ModalComponent = () => {
    const { open, component } = useAppSelector(state => state.modalSlice)

    const dispatch = useAppDispatch()

    const handleCloseClick = (event: React.MouseEvent<HTMLDivElement>) => {
        dispatch(closeModal())
    }

    return (
        <div className={`modal ${open ? 'active' : ''}`}>
            <div className="modal-body">
                <div className="modal-header">
                    <p>
                        { component === modalTypes.login && "Sign in"}
                        { component === modalTypes.register && "Sign up"}
                    </p>
                    <div className="modal-close" onClick={handleCloseClick} />
                </div>
                { component === modalTypes.login && <SignInForm />}
                { component === modalTypes.register && <SignUpForm />}
            </div>
        </div>
    );
};

export default ModalComponent