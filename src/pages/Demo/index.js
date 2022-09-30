import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FacialBiometricKYC from './Tabs/FacialBiometricKYC';
import FacialBiometricKYCSimplified from './Tabs/FacialBiometricKYCSimplified';
import SecureFaceLogin from './Tabs/SecureFaceLogin';
import DocumentVerification from './Tabs/DocumentVerification';
import SahalKYCPortal from './Tabs/SahalKYCPortal';
import DigitalSignature from './Tabs/DigitalSignature';
import VideoKYC from './Tabs/VideoKYC';
import { Link } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div className="p-5 mt-1">{children}</div>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Navbar />
            <div className="text-end container">
                <Link to="/">
                    <button className="btn btn-outline-secondary">
                        Go Back
                    </button>
                </Link>
            </div>
            <h2 className="text-center my-4">Demo Environment</h2>
            <div className="container-fluid mt-2">
                <div className="row mt-2">
                    <div className="col-12">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            variant="scrollable"
                            scrollButtons="auto"
                            textColor="secondary"
                            indicatorColor="secondary"
                            className="mx-sm-0 mx-md-5 px-5"
                        >
                            <Tab
                                label="Facial Biometric KYC"
                                {...a11yProps(0)}
                            />
                            <Tab
                                label="Facial Biometric KYC Simplified"
                                {...a11yProps(1)}
                            />
                            <Tab label="Secure Face Login" {...a11yProps(2)} />
                            <Tab
                                label="Document Verification"
                                {...a11yProps(3)}
                            />
                            <Tab label="Sahal KYC Portal" {...a11yProps(4)} />
                            <Tab label="Video KYC" {...a11yProps(5)} />
                            <Tab label="Digital Signauture" {...a11yProps(6)} />
                            {/* <Tab label="Digital Signauture" {...a11yProps(6)} /> */}
                        </Tabs>

                        <TabPanel value={value} index={0}>
                            <FacialBiometricKYC />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <FacialBiometricKYCSimplified />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <SecureFaceLogin />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <DocumentVerification />
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <SahalKYCPortal />
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            <VideoKYC />
                        </TabPanel>
                        <TabPanel value={value} index={6}>
                            <DigitalSignature />
                        </TabPanel>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
