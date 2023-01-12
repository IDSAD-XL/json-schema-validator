import React from 'react';
import {useAppDispatch, useAppSelector} from "../Hooks/redux";
import {logout, openModal} from "../Redux/ActionCreators";
import {modalTypes} from "../Redux/Reducers/ModalSlice";

const Header = () => {
    const dispatch = useAppDispatch()

    const { user } = useAppSelector(state => state.userSlice)

    const handleLoginButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(openModal(modalTypes.login))
    }

    const handleLogoutButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(logout())
    }

    return (
        <div className="header">
            <span className="header-title">Json Schema Tool</span>
            <div className="header__buttons">
                {user?.name}
                {user === null && <button className="button" onClick={handleLoginButtonClick}>Log in</button>}
                {user !== null && <button className="button" onClick={handleLogoutButtonClick}>Log out</button>}
            </div>
        </div>
    );
};

export default Header;