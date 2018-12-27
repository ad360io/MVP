// Initial state
const initialState = {
    posting: false,
    posted: false,
    hasError: false,
    error: null
}


/**
 *  Core database reducer.
 *  Fetches data from the database and updates the state.
 */
const CreateListingDataReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'POST_CREATE_LISTING_DATA_PENDING': {
            return {
                ...state,
                posting: true,
                error: null,
                hasError: false
            }
        }
        case 'POST_CREATE_LISTING_DATA_REJECTED': {
            return {
                ...state,
                posting: false,
                error: action.payload,
                hasError: true,
            }
        }
        case 'POST_CREATE_LISTING_DATA_FULFILLED': {
            return {
                ...state,
                posting: false,
                posted: true,
                hasError: false,
            }
        }

        default:
            return state;
    }
}

export default CreateListingDataReducer;
