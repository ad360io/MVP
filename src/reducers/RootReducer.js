/*
Redux Libs
*/
import { combineReducers } from 'redux';

/*
Other Reducers
*/
import MenuBarFilterReducer from './MenuBarFilterReducer';
import MarketplaceFilterReducer from './MarketplaceFilterReducer';
import ProfileReducer from './ProfileReducer';
import DashboardDataReducer from './DashboardDataReducer';
import DashboardFilterReducer from './DashboardFilterReducer';
import MarketplaceDataReducer from './MarketplaceDataReducer';
import CreateListingFormReducer from './CreateListingFormReducer';
import CreateListingDataReducer from './CreateListingDataReducer';


/**
 * Root Reducer
 *      organize and combine all reducers used,
 *      all new reducers must be added to RootReducer to be accessed by store.
 */
const RootReducer = combineReducers({
    MenuBarFilterReducer,
    MarketplaceFilterReducer,
    ProfileReducer,
    DashboardDataReducer,
    DashboardFilterReducer,
    MarketplaceDataReducer,
    CreateListingFormReducer,
    CreateListingDataReducer
})


export default RootReducer;
