/*
Redux
*/
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

/*
Reducer
*/
import RootReducer from '../reducers/RootReducer';


// Middleware
const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger());
}

// Store
const store = createStore(
  RootReducer,
  applyMiddleware(...middleware)
);


export default store;
