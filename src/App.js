/*
React, Redux, Router Cores
*/
import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import store from './store/index';

/*
Material-UI Theme
*/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

/*
Local CSS
*/
import './App.css';

const theme = createMuiTheme({
    typography: {
        // In Japanese the characters are usually larger.
        fontSize: 18,
    },
    slider: {
        trackColor: 'rgba(15,15,15,0.3)',
        selectionColor: '#22a571',
        rippleColor: 'purple'
    },
    // overrides: {
    //     MuiStepIcon: {
    //         text: {
    //             fontSize: `1rem`
    //         },
    //     }
    // }
});

/**
 * Application container
 *      set up necessary providers for children components to use.
 */
const App = () => (
    <div className='app-container'>
        <Provider store={store}>
            {/* MuiThemeProvider is required to use Material UI components */}
            <MuiThemeProvider theme={theme}>
                <AppRouter />
            </MuiThemeProvider>
        </Provider>
    </div>
);


export default App;
