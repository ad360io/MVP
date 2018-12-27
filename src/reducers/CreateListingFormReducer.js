/** DEFAULT STATE */
const defaultState = {
    advertiserForm: {
        adFormat: '',
        medium: '',
        description: '',
        topic: '',
    },
    publisherForm: {
        adFormat: '',
        medium: '',
        description: '',
        topic: '',
        imgFile: null,
        price: '',
        timeUnit: 'per day',
        dateFrom: undefined,
        dateTo: undefined,
    },
    advertiserActiveStep: 0,
    publisherActiveStep: 0,
    advertiserSubmitted: false,
    publisehrSubmitted: false,
}

/**
 * MenuBar Filter Reducer
 *      manipulate the unit of currency,
 *      manipulate the mode of user.
 * @param { Object } state   Current state fetched from the store.
 * @param { Object } action  String or Enumerators to represent the desired operations.
 */
const CreateListingFormReducer = (state = defaultState, action) => {

    switch (action.type) {
        case 'SET_ADV_FORM_AD_FORMAT':
            return {
                ...state,
                advertiserForm: {
                    ...state.advertiserForm,
                    adFormat: action.adFormat,
                }
            };

        case 'SET_ADV_FORM_MARKETING_MEDIUM':
            return {
                ...state,
                advertiserForm: {
                    ...state.advertiserForm,
                    medium: action.medium,
                }
            }

        case 'SET_ADV_FORM_DESCRIPTION':
            return {
                ...state,
                advertiserForm: {
                    ...state.advertiserForm,
                    description: action.description,
                }
            }

        case 'SET_ADV_FORM_TOPIC':
            return {
                ...state,
                advertiserForm: {
                    ...state.advertiserForm,
                    topic: action.topic,
                }
            }


        case 'SET_PUB_FORM_AD_FORMAT':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    adFormat: action.adFormat,
                }
            };

        case 'SET_PUB_FORM_MARKETING_MEDIUM':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    medium: action.medium,
                }
            }

        case 'SET_PUB_FORM_DESCRIPTION':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    description: action.description,
                }
            }

        case 'SET_PUB_FORM_TOPIC':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    topic: action.topic,
                }
            }

        case 'SET_PUB_FORM_DATE_RANGE':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    dateTo: action.range.to,
                    dateFrom: action.range.from
                }
            }

        case 'SET_PUB_FORM_DATE_RESET':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    dateTo: undefined,
                    dateFrom: undefined
                }
            }

        case 'SET_PUB_FORM_PRICE':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    price: action.price,
                }
            }

        case 'SET_PUB_FORM_TIME_UNIT':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    timeUnit: action.timeUnit,
                }
            }

        case 'RESET_ADV_FORM':
            return {
                ...state,
                advertiserForm: {
                    adFormat: '',
                    medium: '',
                    description: '',
                    topic: '',
                },
                advertiserActiveStep: 0,
                advertiserSubmitted: false
            }

        case 'RESET_PUB_FORM':
            return {
                ...state,
                publisherForm: {
                    adFormat: '',
                    medium: '',
                    description: '',
                    topic: '',
                    imgFile: null,
                    price: '',
                    timeUnit: 'per day',
                    dateFrom: undefined,
                    dateTo: undefined,
                },
                publisherActiveStep: 0,
                publisherSubmitted: false
            }

        case 'ADV_STEPPER_NEXT':
            return {
                ...state,
                advertiserActiveStep: state.advertiserActiveStep + 1
            }


        case 'ADV_STEPPER_BACK':
            return {
                ...state,
                advertiserActiveStep: state.advertiserActiveStep - 1
            }

        case 'ON_ADV_SUBMIT':
            return {
                ...state,
                advertiserSubmitted: true
            }

        case 'PUB_STEPPER_NEXT':
            return {
                ...state,
                publisherActiveStep: state.publisherActiveStep + 1
            }

        case 'PUB_STEPPER_BACK':
            return {
                ...state,
                publisherActiveStep: state.publisherActiveStep - 1
            }

        case 'ON_PUB_SUBMIT':
            return {
                ...state,
                publisherSubmitted: true
            }

        default:
            return state;
    }
}


export default CreateListingFormReducer;