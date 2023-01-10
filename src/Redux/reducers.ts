import * as actionTypes from "./actionTypes"

const initialState: SchemesState = {
    schemes: [],
}

const schemesReducer = (
    state: SchemesState = initialState,
    action: SchemaAction
): SchemesState => {
    switch (action.type) {
        case actionTypes.SET_SCHEMES:
            return {
                ...state,
                schemes: action.schemes,
            }
        case actionTypes.ADD_SCHEMES:
            const newSchema: ISchema = {
                id: action.schema.id,
                lastChange: action.schema.lastChange,
                content: action.schema.content,
            }
            return {
                ...state,
                schemes: state.schemes.concat(newSchema),
            }
        case actionTypes.REMOVE_SCHEME:
            const updatedSchemes: ISchema[] = state.schemes.filter(
                schema => schema.id !== action.schema.id
            )
            return {
                ...state,
                schemes: updatedSchemes,
            }
    }
    return state
}

export default schemesReducer