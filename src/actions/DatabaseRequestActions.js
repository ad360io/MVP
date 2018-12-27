const fetch_DashboardData_Pending = () => {
    return {
        type: 'FETCH_DASHBOARD_DATA_PENDING'
    }
}

const fetch_DashboardData_Fulfilled = (data) => {
    return {
        type: 'FETCH_DASHBOARD_DATA_FULFILLED',
        payload: data
    }
}

const fetch_DashboardData_Rejected = (err) => {
    return {
        type: 'FETCH_DASHBOARD_DATA_REJECTED',
        payload: err
    }
}

const fetch_MarketplaceData_Pending = () => {
    return {
        type: 'FETCH_MARKETPLACE_DATA_PENDING'
    }
}

const fetch_MarketplaceData_Fulfilled = (response) => {
    return {
        type: 'FETCH_MARKETPLACE_DATA_FULFILLED',
        payload: response
    }
}

const fetch_MarketplaceData_Rejected = (err) => {
    return {
        type: 'FETCH_MARKETPLACE_DATA_REJECTED',
        payload: err
    }
}

const post_CreateListingData_Pending = () => {
    return {
        type: 'POST_CREATE_LISTING_DATA_PENDING'
    }
}

const post_CreateListingeData_Fulfilled = (data) => {
    return {
        type: 'POST_CREATE_LISTING_DATA_FULFILLED',
        payload: data
    }
}

const post_CreateListingData_Rejected = (err) => {
    return {
        type: 'POST_CREATE_LISTING_DATA_REJECTED',
        payload: err
    }
}

export {
    fetch_DashboardData_Pending,
    fetch_DashboardData_Fulfilled,
    fetch_DashboardData_Rejected,
    fetch_MarketplaceData_Pending,
    fetch_MarketplaceData_Fulfilled,
    fetch_MarketplaceData_Rejected,
    post_CreateListingData_Pending,
    post_CreateListingeData_Fulfilled,
    post_CreateListingData_Rejected
} 