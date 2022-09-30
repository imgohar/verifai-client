import React, { Fragment, useState, useEffect } from 'react';
import { Form, Label, Input, FormGroup, FormFeedback } from 'reactstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ApiEndpoint from './components/ApiEndpoint';
import Code from './components/Code';
import Response from '../Shared/Response';

const ToastContent = ({ message }) => (
    <Fragment>
        <div className="toastify-header">
            <div className="title-wrapper">
                <h6 className="toast-title fw-bold">New Message!</h6>
            </div>
        </div>
        <div className="toastify-body">
            <span>{message}</span>
        </div>
    </Fragment>
);

const SahalKYCPortal = () => {
    let testKey = process.env.REACT_APP_PROD_SAHAL_KYC_PORTAL_TEST_KEY;
    let liveKey = process.env.REACT_APP_PROD_SAHAL_KYC_PORTAL_LIVE_KEY;

    const [value, setValue] = useState(
        'https://production.sahal.ai/api/v1/full-kyc/verification-url'
    );

    const [open, setOpen] = useState(false);
    const [link, setLink] = useState('');
    const [response, setResponse] = useState('');
    const [token, setToken] = useState(testKey);
    const [showLink, setShowLink] = useState(false);

    const defaultValues = {};

    const [alignment, setAlignment] = useState('test');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        if (newAlignment === 'test') {
            setToken(testKey);
        } else {
            setToken(liveKey);
        }
    };

    const {
        control,
        setError,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({ defaultValues });

    const onReset = () => {
        reset({ defaultValues });
        setResponse('');
        setShowLink(false);
        setLink('');
        setValue(
            `https://production.sahal.ai/api/v1/full-kyc/verification-url`
        );
    };

    const onSubmit = async (data) => {
        setOpen(true);
        delete data.defaultValues;
        if (Object.values(data).every((field) => field.length > 0)) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: `application/json`,
                },
            };

            let response = {};

            await axios
                .get(
                    `https://production.sahal.ai/api/v1/full-kyc/verification-url`,
                    config
                )
                .then((res) => {
                    setShowLink(true);
                    setOpen(false);
                    response = res.data;
                })
                .catch((err) => {
                    setOpen(false);
                    console.log(err);
                    setShowLink(false);
                    response = err;
                    setResponse(err.response);
                    toast.error(
                        <ToastContent
                            message={`There is a problem getting the response please copy your token from the dashboard`}
                        />
                    );
                });

            if (response.success == true) {
                setOpen(false);
                setShowLink(true);
                setResponse(response);
                setLink(response.data.url);
                toast.success(
                    <ToastContent message={`Response generated successfully`} />
                );
            } else if (response.success == false) {
                setOpen(false);
                setShowLink(false);
                setResponse(response.data);
                toast.error(
                    <ToastContent
                        message={`There is a problem getting the response please copy your token from the dashboard`}
                    />
                );
            }
        } else {
            setOpen(false);
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: 'manual',
                        message: `${key} is required`,
                    });
                }
            }
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Sahal KYC Portal</h2>

            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {/* APIENDPOINT COMPONENT */}
            <ApiEndpoint value={value} />

            <h4 className="mt-5">Api Testing</h4>

            <ToggleButtonGroup
                color="secondary"
                value={alignment}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton value="test">Test Token</ToggleButton>
                <ToggleButton value="live">Live Token</ToggleButton>
            </ToggleButtonGroup>

            <div className="row">
                <div className="col-6">
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        inline
                        className="mt-3"
                    >
                        {showLink === true ? (
                            <div className="my-3 mt-5">
                                <h3>Link Generated</h3>
                                <a
                                    href={link}
                                    className="text-warning"
                                    target="_blank"
                                >
                                    {link}
                                </a>
                            </div>
                        ) : null}

                        <Button
                            type="submit"
                            color="warning"
                            variant="contained"
                        >
                            Send
                        </Button>
                        <Button
                            onClick={onReset}
                            type="reset"
                            className="ms-1"
                            variant="outlined"
                            color="secondary"
                        >
                            Reset
                        </Button>
                    </Form>
                </div>
            </div>
            <p className="lead fs-6 mt-2">
                <strong className="fw-bold">Note! </strong>Both live and test
                token can be copied from integration menu of dashboard once you
                get approved.
            </p>

            {/* RESPONSE COMPONENT */}
            <Response link={response} />

            {link != '' ? (
                <iframe
                    src={link}
                    style={{
                        width: '100%',
                        height: '700px',
                    }}
                    allow="camera"
                    allowFullScreen
                ></iframe>
            ) : null}

            {window.addEventListener('message', function (e) {
                if (e.data.sahal) {
                    console.log(e.data.sahal);
                }
            })}

            {/* CODE COMPONENT */}
            <Code value={value} link={link} token={token} />
        </div>
    );
};

export default SahalKYCPortal;
