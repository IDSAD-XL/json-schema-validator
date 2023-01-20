import React from 'react';
import {useAppSelector} from "../Hooks/redux";

const ErrorAlert = () => {
    const { alerts } = useAppSelector(state => state.alertsReducer)

    return (
        <div className="alert-wrapper">
            {alerts.map((item, index) =>
                <div key={index} className={`alert ${item.type}`}>
                    {item.text}
                </div>
            )}
        </div>
    );
};

export default ErrorAlert;
