/** DEFAULT STATE */
const defaultState = {
    currencyFilter: 'XQC',
    modeFilter: 'Advertiser'
}

/**
 * MenuBar Filter Reducer
 *      manipulate the unit of currency,
 *      manipulate the mode of user.
 * @param { Object } state   Current state fetched from the store.
 * @param { Object } action  String or Enumerators to represent the desired operations.
 */
const MenuBarFilterReducer = (state = defaultState, action) => {

    switch (action.type) {
        case 'SET_CURRENCY_FILTER':
            return {
                ...state,
                currencyFilter: action.currencyFilter
            };

        case 'SET_MODE_FILTER':
            return {
                ...state,
                modeFilter: action.modeFilter
            }

        default:
            return state;
    }
}


export default MenuBarFilterReducer;