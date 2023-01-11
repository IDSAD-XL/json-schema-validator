import React from 'react';
import {useAppSelector} from "../Hooks/redux";
import {AlertTypes} from "../Models/IAlert";

const ErrorAlert = () => {
    const { alerts } = useAppSelector(state => state.alertsReducer)

    function getClassName (type: AlertTypes) {
        if (type === AlertTypes.info) return "alert-info"
        if (type === AlertTypes.warning) return "alert-warning"
        if (type === AlertTypes.error) return "alert-error"
        if (type === AlertTypes.success) return "alert-success"
    }

    return (
        <div className="alert-wrapper">
            {alerts.map((item, index) =>
                <div key={index} className={`alert ${getClassName(item.type)}`}>
                    {item.text}
                </div>
            )}
        </div>
    );
};

export default ErrorAlert;
