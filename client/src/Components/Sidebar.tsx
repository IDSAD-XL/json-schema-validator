import React from 'react';
import {useAppSelector} from "../Hooks/redux";

const Sidebar = () => {
    const { schemes } = useAppSelector(state => state.schemesReducer)



    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <button className="button">
                    Create New Scheme
                </button>
            </div>
            <div className="sidebar-saved-schemes">
                <div className="sidebar-saved-schemes__header">
                    <span>Saved Schemes</span>
                </div>
            </div>
            <div className="sidebar-saved-schemes__items">
                {schemes.length === 0 &&
                    <p>You have no saved schemes</p>
                }
                {schemes.length > 0 &&
                    schemes.map((item) =>
                        <div key={item.id} className="sidebar-saved-schemes__item">
                            ${item.name}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Sidebar;