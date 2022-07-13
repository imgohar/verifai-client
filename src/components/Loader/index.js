import React from 'react';
import Logo from '../../assets/images/sahal-logo.jpeg';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <div className="d-flex justify-content-center min-vh-100 align-items-center">
            <div className="row">
                <div className="col-sm-12 text-center">
                    <img src={Logo} style={{ width: '150px' }} alt="Loader" />
                </div>
                <div className="col-sm-12 mt-5 text-center">
                    <CircularProgress color="warning" />
                </div>
            </div>
        </div>
    );
};

export default Loader;
