import React from 'react';
import Sidebar from "./Components/Sidebar";
import Workspace from "./Components/Workspace";
import Alert from "./Components/Alert";
import ModalComponent from "./Components/ModalApp";

const App = () => {
    return (
        <>
            <Sidebar />
            <Workspace />
            <Alert />
            <ModalComponent />
        </>
    );
};

export default App;