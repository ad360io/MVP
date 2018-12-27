/** DEFAULT STATE */
const defaultState = {
    profile: {
        name: 'User Name',
        nickname: 'Nickname',
        email: 'Email',
        avatar_url: ''
    },
    idToken: null,
}

/**
 * Profile Reducer 
 *      manipulate the data that represents the user 
 *      fetched from auth0 services. 
 * @param { Object } state   Current state fetched from the store.
 * @param { Object } action  String or Enumerators to represent the desired operations.
 */
const ProfileReducer = (state = defaultState, action) => {

    switch (action.type) {
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.value
            };

        case 'SET_ID_TOKEN':
            return {
                ...state,
                idToken: action.value
            }

        default:
            return state;
    }
}


export default ProfileReducer;