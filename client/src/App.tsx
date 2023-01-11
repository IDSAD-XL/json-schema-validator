import React from 'react';
import Sidebar from "./Components/Sidebar";
import Workspace from "./Components/Workspace";
import Alert from "./Components/Alert";
import ModalComponent from "./Components/ModalComponent";
import Header from "./Components/Header";

const App = () => {
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