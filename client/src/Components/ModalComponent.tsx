import React from 'react';
import {useAppSelector} from "../Hooks/redux";
import {modalTypes} from "../Redux/Reducers/ModalSlice";
import SignInForm from "./SignInForm";

const ModalComponent = () => {
    const { open, component } = useAppSelector(state => state.modalSlice)

    return (
        <div className={`modal ${open ? 'active' : ''}`}>
            <div className="modal-body">
                <div className="modal-header">
                    <p>
                        { component === modalTypes.login && "Sign in"}
                        { component === modalTypes.register && "Sign up"}
                    </p>
                    <div className="button-close">

                    </div>
                </div>
                { component === modalTypes.login && <SignInForm />}
            </div>
        </div>
    );
};

export default ModalComponent