/** DEFAULT STATE */
const defaultState = {
    isDrawerOpen: false,
    budgetFilter: 7.5,
    adFormatFilter: 'Show All',
    mediumFilter: '',
    viewModeFilter: 'Listing',
    keywordFilter: '',
    currentPageNumber: 1,
    sortingType: 'Date Added'
}

/**
 * Marketplace Filter Reducer
 *      manages the state of drawer,
 *      manipulate the budget value on the slider bar,
 *      and manipulate the listing genre.
 * @param { Object } state   Current state fetched from the store.
 * @param { Object } action  String or Enumerators to represent the desired operations.
 */
const MarketplaceFilterReducer = (state = defaultState, action) => {

    switch (action.type) {
        case 'OPEN_DRAWER':
            return {
                ...state,
                isDrawerOpen: true
            };

        case 'CLOSE_DRAWER':
            return {
                ...state,
                isDrawerOpen: false
            }

        case 'TOGGLE_DRAWER':
            return {
                ...state,
                isDrawerOpen: !state.open
            }

        case 'SET_DRAWER':
            return {
                ...state,
                isDrawerOpen: action.value
            }

        case 'SET_BUDGET_VALUE':
            return {
                ...state,
                budgetFilter: action.value
            }

        case 'SET_AD_FORMAT':
            return {
                ...state,
                adFormatFilter: action.value
            }

        case 'SET_VIEW_MODE':
            return {
                ...state,
                viewModeFilter: action.value
            }

        case 'SET_MEDIUM_FILTER':
            return {
                ...state,
                mediumFilter: action.value
            }

        case 'CLEAR_MEDIUM_FILTER':
            return {
                ...state,
                mediumFilter: ''
            }

        case 'SET_KEYWORD':
            return {
                ...state,
                keywordFilter: action.value
            }

        case 'SET_PAGE_NUMBER':
            return {
                ...state,
                currentPageNumber: action.value
            }

        case 'SET_SORTING_TYPE':
            return {
                ...state,
                sortingType: action.value
            }

        default:
            return state;
    }
}


export default MarketplaceFilterReducer;