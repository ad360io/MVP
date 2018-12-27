const setBudget = (budget) => {
    return {
        type: 'SET_BUDGET_VALUE',
        value: budget
    }
}

const drawerRequest = (open) => {
    return {
        type: 'SET_DRAWER',
        value: open
    }
}

const openDrawer = () => {
    return {
        type: 'OPEN_DRAWER'
    }
}

const closeDrawer = () => {
    return {
        type: 'CLOSE_DRAWER'
    }
}

const setAdFormat = (adFormat, dispatch) => {
    dispatch(clearMedium());
    return {
        type: 'SET_AD_FORMAT',
        value: adFormat
    }
}

const setViewMode = (viewModeFilter) => {
    return {
        type: 'SET_VIEW_MODE',
        value: viewModeFilter
    }
}

const setMedium = (mediumFilter, dispatch, adFormat) => {
    dispatch(setAdFormat(adFormat, dispatch));
    return {
        type: 'SET_MEDIUM_FILTER',
        value: mediumFilter
    }
}

const clearMedium = () => {
    return {
        type: 'CLEAR_MEDIUM_FILTER',
    }
}

const setKeyword = (keyword) => {
    return {
        type: 'SET_KEYWORD',
        value: keyword
    }
}

export { setBudget, drawerRequest, openDrawer, closeDrawer, setAdFormat, setViewMode, setMedium, setKeyword }