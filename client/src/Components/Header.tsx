import React from 'react';
import {useAppDispatch} from "../Hooks/redux";
import {openRegisterModal} from "../Redux/ActionCreators";

const Header = () => {
    const dispatch = useAppDispatch()

    const handleLoginButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(openRegisterModal())
    }

    return (
        <div>
            <button className="button" onClick={handleLoginButtonClick}>Log in</button>
        </div>
    );
};

export default Header;