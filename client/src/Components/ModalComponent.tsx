import React from 'react';
import {useAppSelector} from "../Hooks/redux";
import {modalTypes} from "../Redux/Reducers/ModalSlice";
import SignInForm from "./SignInForm";

const ModalComponent = () => {
    const { open, component } = useAppSelector(state => state.modalSlice)

    return (
        <div className={`modal ${open ? 'active' : ''}`}>
            <div className="modal-body">
                { component === modalTypes.register && <SignInForm />}
            </div>
        </div>
    );
};

export default ModalComponent