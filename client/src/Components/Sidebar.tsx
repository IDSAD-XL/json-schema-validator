import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../Hooks/redux";
import {createNewScheme, deleteSchema, setSchemeIntoWorkspace} from "../Redux/ActionCreators";
import {ISchema} from "../Models/ISchema";

const Sidebar = () => {
    const { schemes } = useAppSelector(state => state.schemesReducer)
    const dispatch = useAppDispatch()

    const handleCreateNewSchemeButtonClick = () => {
        dispatch(createNewScheme())
    }

    const handleSchemeClick = (id: string) => {
        dispatch(setSchemeIntoWorkspace(id))
    }

    const handleDeleteClick = (scheme: ISchema) => {
        dispatch(deleteSchema(scheme))
    }

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <button className="button" onClick={handleCreateNewSchemeButtonClick}>
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
                        <div
                            key={item.id} className="sidebar-saved-schemes__item"
                        >
                            <span
                              className="sidebar-saved-schemes__item-title"
                              onClick={(e) => handleSchemeClick(item.id)}
                            >
                              {item.name || "New Scheme"}
                            </span>
                            <span
                              className="sidebar-saved-schemes__item-delete"
                              onClick={() => {handleDeleteClick(item)}}
                            >
                              Delete
                            </span>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Sidebar;