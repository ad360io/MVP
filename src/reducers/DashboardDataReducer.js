// Initial state
const initialState = {
    fetching: false,
    fetched: false,
    hasError: false,
    db: {
        // advertiserDailyData: {
        //     "Impressions": 0,
        //     "Impressions_trend": "0",
        //     "Clicks": 0,
        //     "Clicks_trend": "",
        //     "Total_Spend": "0",
        //     "Total_Spend_trend": "",
        //     "Balance": "0",
        //     "Balance_trend": "",
        //     "Purchased_Contract": "0",
        //     "Purchased_Contract_trend": "",
        //     "Total_Invoice_Due": "0"
        // },
        // publisherDailyData: {
        //     "Impressions": 0,
        //     "Impressions_trend": "0",
        //     "Clicks": 0,
        //     "Clicks_trend": "",
        //     "Total_Spend": "0",
        //     "Total_Spend_trend": "",
        //     "Balance": "0",
        //     "Balance_trend": "",
        //     "Purchased_Contract": "0",
        //     "Purchased_Contract_trend": "",
        //     "Total_Invoice_Due": "0"
        // },
        // "xqcContracts": [],
        // "eqcContracts": []
    },
    error: null
}


/**
 *  Core database reducer.
 *  Fetches data from the database and updates the state.
 */
const DashboardDataReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'FETCH_DASHBOARD_DATA_PENDING': {
            return {
                ...state,
                fetching: true
            }
        }
        case 'FETCH_DASHBOARD_DATA_REJECTED': {
            return {
                ...state,
                fetching: false,
                error: action.payload,
                hasError: true,
            }
        }
        case 'FETCH_DASHBOARD_DATA_FULFILLED': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                hasError: false,
                db: action.payload,
            }
        }
        default:
            return state;
    }
}

export default DashboardDataReducer;
