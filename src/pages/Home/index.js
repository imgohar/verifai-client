import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="container mt-2">
                <div className="row mt-2" style={{ height: '80vh' }}>
                    <div className="col-12">
                        <h2 className="text-center">Sahal Verifai</h2>
                        <p className="lead text-center">
                            Choose your testing environment from below options
                        </p>
                        <div className="text-center">
                            <Link to="/demo" className="text-decoration-none">
                                <button className="btn btn-lg mx-2 px-5 btn-outline-warning">
                                    Demo
                                </button>
                            </Link>
                            <Link to="/prod" className="text-decoration-none">
                                <button className="btn btn-lg mx-2 px-5 btn-outline-secondary">
                                    Prod
                                </button>
                            </Link>
                            <Link
                                to="/develop"
                                className="text-decoration-none"
                            >
                                <button className="btn btn-lg mx-2 px-5 btn-outline-warning">
                                    Develop / Staging
                                </button>
                            </Link>
                            <Link to="/local" className="text-decoration-none">
                                <button className="btn btn-lg mx-2 px-5 btn-outline-secondary">
                                    Local
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
