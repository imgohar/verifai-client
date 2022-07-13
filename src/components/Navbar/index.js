import React from 'react';
import Logo from '../../assets/images/sahal-logo.jpeg';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="m-2 mb-4 ps-5 pt-3">
            <Link to="/">
                <img src={Logo} style={{ width: '220px' }} alt="Logo" />
            </Link>
        </div>
    );
};

export default Navbar;
