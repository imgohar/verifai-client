import React from 'react';
import Logo from '../../assets/images/logo.png';
// import Townary404 from '../../assets/illustrations/placeholders/3.svg';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container-fluid min-vh-100">
            <div className="text-center">
                <img
                    className="dark-image mt-2"
                    src={Logo}
                    alt="Sahal Logo"
                    height="50px"
                ></img>
            </div>

            <div className="container mt-5 text-center">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h3 className="display-4">
                            We couldn't find this page
                        </h3>
                        <p className="lead">
                            Looks like we couldn't find that page.
                        </p>
                        <Link to="/" className="text-dark fs-bold h6">
                            Go Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
