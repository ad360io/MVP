/** DEFAULT STATE */
const defaultState = {
    activeStat: 'Impression',
    keyword: ''
}

/**
 * Dashboard Filter Reducer
 *      manipulate the unit of currency,
 *      manipulate the mode of user.
 * @param { Object } state   Current state fetched from the store.
 * @param { Object } action  String or Enumerators to represent the desired operations.
 */
const DashboardFilterReducer = (state = defaultState, action) => {

    switch (action.type) {
        case 'SET_ACTIVE_STAT':
            return {
                ...state,
                activeStat: action.value
            };

        case 'SET_KEYWORD':
            return {
                ...state,
                keyword: action.value
            }
        default:
            return state;
    }
}


export default DashboardFilterReducer;