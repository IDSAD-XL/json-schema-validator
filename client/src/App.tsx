import React, {useEffect} from 'react';
import Sidebar from "./Components/Sidebar";
import Workspace from "./Components/Workspace";
import Alert from "./Components/Alert";
import ModalComponent from "./Components/ModalComponent";
import Header from "./Components/Header";
import {useAppDispatch, useAppSelector} from "./Hooks/redux";
import {getSchemes, setToken} from "./Redux/ActionCreators";

const App = () => {
    const dispatch = useAppDispatch()

    dispatch(setToken())

    const { token } = useAppSelector(state => state.userSlice)

    if (token) {
        dispatch(getSchemes())
    }

    return (
        <>
            <Alert />
            <ModalComponent />
            <Header />
            <div className="app-space">
                <Sidebar />
                <Workspace />
            </div>
        </>
    );
};

export default App;