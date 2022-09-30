import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Demo from '../pages/Demo';
import Home from '../pages/Home';
import Prod from '../pages/Prod';
import Develop from '../pages/Develop';
import Local from '../pages/Local';
import NotFound from '../pages/Errors/NotFound';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/demo" element={<Demo />} />
                <Route exact path="/prod" element={<Prod />} />
                <Route exact path="/develop" element={<Develop />} />
                <Route exact path="/local" element={<Local />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
