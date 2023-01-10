import React, {ReactNode} from 'react';
import {useAppSelector} from "../Hooks/redux";

const ModalComponent = () => {
    const { open, component } = useAppSelector(state => state.modalSlice)

    return (
        <div className={`modal ${open ? 'active' : ''}`}>
            <div className="modal-body">
                {component as ReactNode}
            </div>
        </div>
    );
};

export default ModalComponent