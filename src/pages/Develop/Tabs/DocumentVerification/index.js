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
import Response from './components/Response';

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

const DocumentVerification = () => {
    let testKey = process.env.REACT_APP_DEVELOP_DOCUMENT_VERIFICATION_TEST_KEY;
    let liveKey = process.env.REACT_APP_DEVELOP_DOCUMENT_VERIFICATION_LIVE_KEY;
    const [value, setValue] = useState(
        'https://develop.sahal.ai/api/v1/document-verification/process'
    );

    let boundary =
        Math.floor(Math.random() * 11) + Math.floor(Math.random() * 11);

    const [open, setOpen] = useState(false);
    // const [link, setLink] = useState('');
    const [file, setFile] = useState(null);

    const [response, setResponse] = useState('');
    const [token, setToken] = useState(testKey);

    const [alignment, setAlignment] = useState('test');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        if (newAlignment === 'test') {
            setToken(testKey);
        } else {
            setToken(liveKey);
        }
    };

    const { handleSubmit } = useForm();

    const onReset = () => {
        setResponse('');
        setFile(null);
    };

    const handleFileSelect = (event) => {
        setFile(event.target.files[0]);
    };

    const onSubmit = async () => {
        setOpen(true);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type':
                    'multipart/form-data; charset=utf-8; boundary=23',
                Accept: 'application/json',
            },
        };
        const formData = new FormData();
        formData.append('file', file);
        let response = {};

        await axios
            .post(
                `https://develop.sahal.ai/api/v1/document-verification/process`,
                formData,
                config
            )
            .then((res) => {
                setOpen(false);
                response = res.data;
                setResponse(res.data);
            })
            .catch((err) => {
                console.log(err);
                setResponse(err.response);
                setOpen(false);
                toast.error(
                    <ToastContent
                        message={`Document is not verified successfully.`}
                    />
                );
            });

        if (response.success == true) {
            setOpen(false);
            toast.success(
                <ToastContent message={`Document Verified successfully`} />
            );
        } else if (response.success == false) {
            setOpen(false);
            toast.error(
                <ToastContent
                    message={`Document is not verified successfully.`}
                />
            );
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Document Verification</h2>

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
                        <FormGroup>
                            <Label for="userReference" hidden>
                                File
                            </Label>

                            <input
                                type="file"
                                className="form-control"
                                onChange={handleFileSelect}
                            />
                        </FormGroup>

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

            {/* CODE COMPONENT */}
            <Code file={file} value={value} token={token} boundary={boundary} />
        </div>
    );
};

export default DocumentVerification;
