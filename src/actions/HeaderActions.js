const setMode = (mode) => {
    return {
        type: 'SET_MODE_FILTER',
        modeFilter: mode
    }
}

const setCurrency = (currency) => {
    return {
        type: 'SET_CURRENCY_FILTER',
        currencyFilter: currency
    }
}

export { setMode, setCurrency };