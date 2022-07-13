import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Home from '../pages/Home';
// import NotFound from '../pages/Errors/NotFound';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/online-api-testing" element={<Home />} />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
