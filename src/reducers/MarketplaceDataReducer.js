// Initial state
const initialState = {
    fetching: false,
    fetched: false,
    hasError: false,
    total: 0,
    db: {
        listings: []
    },
    viewingId: null,
    error: null
}


/**
 *  Core database reducer.
 *  Fetches data from the database and updates the state.
 */
const MarketplaceDataReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'FETCH_MARKETPLACE_DATA_PENDING': {
            return {
                ...state,
                fetching: true,
                fetched: false,
            }
        }

        case 'FETCH_MARKETPLACE_DATA_REJECTED': {
            return {
                ...state,
                fetching: false,
                error: action.payload,
                hasError: true,
            }
        }

        case 'FETCH_MARKETPLACE_DATA_FULFILLED': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                hasError: false,
                db: {
                    listings: action.payload.data
                },
                total: Number.parseInt(action.payload.headers['content-range'].split('/')[1], 10),
            }
        }

        default: {
            return state;
        }
    }
}

export default MarketplaceDataReducer;
