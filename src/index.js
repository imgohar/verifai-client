// ** React Imports
import React, { Suspense, lazy } from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';

// ** Styles
import './index.css';

// Custom CSS
import './App.scss';

import { ToastContainer } from 'react-toastify';

// Loader
import Loader from './components/Loader';

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// ** Hover SCSS
import 'hover.css/scss/hover.scss';

// ** Lazy load app
const LazyApp = lazy(() => import('./App'));

// All Custom CSS
import './core/scss/index.scss';

import reportWebVitals from './reportWebVitals';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        warning: {
            main: '#ffb017',
        },
        secondary: {
            main: '#060039',
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Suspense fallback={<Loader />}>
            <ThemeProvider theme={theme}>
                <LazyApp />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </ThemeProvider>
        </Suspense>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
