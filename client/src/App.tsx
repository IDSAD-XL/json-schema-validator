import React from 'react';
import Sidebar from "./Components/Sidebar";
import Workspace from "./Components/Workspace";
import Alert from "./Components/Alert";

const App = () => {
    return (
        <>
            <Sidebar />
            <Workspace />
            <Alert />
        </>
    );
};

export default App;