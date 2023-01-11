import React from 'react';
import {useAppDispatch} from "../Hooks/redux";
import {openModal} from "../Redux/ActionCreators";
import {modalTypes} from "../Redux/Reducers/ModalSlice";

const Header = () => {
    const dispatch = useAppDispatch()

    const handleLoginButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(openModal(modalTypes.login))
    }

    return (
        <div>
            <button className="button" onClick={handleLoginButtonClick}>Log in</button>
        </div>
    );
};

export default Header;