import React from 'react';

const Footer = () => {
    return (
        <div
            className="bg-sahal-1 text-white"
            style={{ overflow: 'hidden', boxSizing: 'border-box' }}
        >
            <div className="row pt-4 pb-3">
                <div className="col-12 col-md-8 px-5">
                    <div className="row" style={{ width: '80%' }}>
                        <div className="col-12 col-md-4 ps-5">
                            <p
                                style={{
                                    fontSize: '24px',
                                    fontWeight: 'bolder',
                                }}
                            >
                                Support
                            </p>
                            <p
                                style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '500',
                                }}
                            >
                                <a href="" className="text-white footer-link">
                                    Contact us
                                </a>
                            </p>
                        </div>
                        <div className="col-12 col-md-4 ps-5">
                            <p
                                style={{
                                    fontSize: '24px',
                                    fontWeight: 'bolder',
                                }}
                            >
                                Our Technology
                            </p>
                            <p
                                style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '500',
                                }}
                            >
                                <a href="" className="text-white footer-link">
                                    Use case
                                </a>
                            </p>
                            <p
                                style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '500',
                                }}
                            >
                                <a href="" className="text-white footer-link">
                                    Developer Resources
                                </a>
                            </p>
                            <p
                                style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '500',
                                }}
                            >
                                <a href="" className="text-white footer-link">
                                    Parternship
                                </a>
                            </p>
                        </div>
                        <div className="col-12 col-md-4 ps-5">
                            <p
                                style={{
                                    fontSize: '24px',
                                    fontWeight: 'bolder',
                                }}
                            >
                                Our Company
                            </p>
                            <p
                                style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '500',
                                }}
                            >
                                <a href="" className="text-white footer-link">
                                    About us
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div
                        className="d-flex align-self-end align-content-end justify-content-center row"
                        style={{ height: '100%' }}
                    >
                        <div className="col-2">
                            <a
                                href=""
                                className="footer-icon bg-white cursor-pointer rounded-circle px-2"
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>
                        </div>
                        <div className="col-2">
                            <a
                                href=""
                                className="footer-icon bg-white cursor-pointer rounded-circle px-2"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                        <div className="col-2">
                            <a
                                href=""
                                className="footer-icon bg-white cursor-pointer rounded-circle px-2"
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                        </div>
                        <div className="col-2">
                            <a
                                href=""
                                className="footer-icon bg-white cursor-pointer rounded-circle px-2"
                            >
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <p
                    style={{
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        lineHeight: '1.75rem',
                    }}
                    className="mt-2 ms-5"
                >
                    Copyright © 2022 Sahal Software Solutions (Pvt) Ltd. All
                    rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
