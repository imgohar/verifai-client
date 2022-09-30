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

const VideoKYC = () => {
    let testKey = process.env.REACT_APP_DEVELOP_VIDEO_KYC_TEST_KEY;
    let liveKey = process.env.REACT_APP_DEVELOP_VIDEO_KYC_LIVE_KEY;

    const defaultValues = {
        startDate: '',
        endDate: '',
        notes: '',
        restrictedAccess: false,
        isAdmin1: false,
        name1: '',
        password1: '',
        email1: '',
        isAdmin2: false,
        name2: '',
        password2: '',
        email2: '',
    };

    const {
        control,
        setError,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({ defaultValues });

    const name1 = watch('name1', '');
    const name2 = watch('name2', '');
    const isAdmin1 = watch('isAdmin1', false);
    const isAdmin2 = watch('isAdmin2', false);
    const notes = watch('notes', '');
    const email1 = watch('email1', '');
    const email2 = watch('email2', '');
    const password1 = watch('password1', '');
    const password2 = watch('password2', '');
    const restrictedAccess = watch('restrictedAccess', false);
    const startDate = watch('startDate', '');
    const endDate = watch('endDate', '');

    const [value, setValue] = useState(
        'https://develop.sahal.ai/api/v1/video-kyc/conferences'
    );

    const [body, setBody] = useState({
        start_date: startDate,
        end_date: endDate,
        restrict_access: restrictedAccess,
        notes: notes,
        members: [
            {
                name: name1,
                email: email1,
                password: password1,
                is_admin: isAdmin1,
            },
            {
                name: name2,
                email: email2,
                password: password2,
                is_admin: isAdmin2,
            },
        ],
    });

    useEffect(() => {
        setBody({
            start_date: startDate,
            end_date: endDate,
            restrict_access: restrictedAccess,
            notes: notes,
            members: [
                {
                    name: name1,
                    email: email1,
                    password: password1,
                    is_admin: isAdmin1,
                },
                {
                    name: name2,
                    email: email2,
                    password: password2,
                    is_admin: isAdmin2,
                },
            ],
        });
    }, [
        isAdmin2,
        password2,
        name2,
        email2,
        isAdmin1,
        password1,
        email1,
        name1,
        notes,
        endDate,
        startDate,
        restrictedAccess,
    ]);

    const [open, setOpen] = useState(false);
    const [link, setLink] = useState('');
    const [response, setResponse] = useState('');
    const [token, setToken] = useState(testKey);
    const [showLink, setShowLink] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    const [alignment, setAlignment] = useState('test');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        if (newAlignment === 'test') {
            setToken(testKey);
        } else {
            setToken(liveKey);
        }
    };

    const onReset = () => {
        reset({ defaultValues });
        setResponse('');
        setShowLink(false);
        setLink('');
        setValue(`https://develop.sahal.ai/api/v1/video-kyc/conferences`);
    };

    const onSubmit = async (data) => {
        setOpen(true);
        delete data.defaultValues;
        const tempData = { ...data };
        delete tempData.restrictedAccess;
        delete tempData.isAdmin1;
        delete tempData.isAdmin2;
        delete tempData.notes;
        delete tempData.name1;
        delete tempData.name2;
        if (Object.values(tempData).every((field) => field.length > 0)) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: `application/json`,
                },
            };

            let response = {};
            let bodyData = {
                start_date: data.startDate,
                end_date: data.endDate,
                restrict_access: data.restrictedAccess,
                notes: data.notes,
                members: [
                    {
                        name: data.name1,
                        email: data.email1,
                        password: data.password1,
                        is_admin: data.isAdmin1,
                    },
                    {
                        name: data.name2,
                        email: data.email2,
                        password: data.password2,
                        is_admin: data.isAdmin2,
                    },
                ],
            };

            await axios
                .post(
                    `https://develop.sahal.ai/api/v1/video-kyc/conferences`,
                    bodyData,
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
                if (key == 'notes' || key == 'name1' || key == 'name2') {
                    continue;
                } else {
                    if (data[key].length === 0) {
                        setError(key, {
                            type: 'manual',
                            message: `${key} is required`,
                        });
                    }
                }
            }
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Video KYC</h2>
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
                            <Label for="startDate" className="fw-bold">
                                Start Date
                            </Label>

                            <Controller
                                id="startDate"
                                name="startDate"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="date"
                                        min={today}
                                        placeholder="Start Date"
                                        className="form-control"
                                        invalid={errors.startDate && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.startDate ? (
                                <FormFeedback>
                                    {errors.startDate.message}
                                </FormFeedback>
                            ) : null}
                        </FormGroup>

                        <FormGroup>
                            <Label for="endDate" className="fw-bold">
                                End Date
                            </Label>

                            <Controller
                                id="endDate"
                                name="endDate"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="date"
                                        min={today}
                                        placeholder="End Date"
                                        className="form-control"
                                        invalid={errors.endDate && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.endDate ? (
                                <FormFeedback>
                                    {errors.endDate.message}
                                </FormFeedback>
                            ) : null}
                        </FormGroup>

                        <FormGroup>
                            <Label for="endDate" hidden>
                                Notes
                            </Label>

                            <Controller
                                id="notes"
                                name="notes"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="textarea"
                                        placeholder="Notes"
                                        className="form-control"
                                        invalid={errors.notes && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.notes ? (
                                <FormFeedback>
                                    {errors.notes.message}
                                </FormFeedback>
                            ) : null}
                        </FormGroup>

                        <FormGroup>
                            <Label for="restrictedAccess" className="me-2 mt-1">
                                Restricted Access
                            </Label>
                            <Controller
                                id="restrictedAccess"
                                name="restrictedAccess"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="checkbox"
                                        className="form-check d-inline-block"
                                        checked={field.value}
                                        invalid={
                                            errors.restrictedAccess && true
                                        }
                                        {...field}
                                    />
                                )}
                            />
                            {errors.restrictedAccess ? (
                                <FormFeedback>
                                    {errors.restrictedAccess.message}
                                </FormFeedback>
                            ) : null}
                        </FormGroup>

                        <h3>Members</h3>
                        <br />

                        <h4>Member 1</h4>

                        {/* MEMBER 1 */}

                        <FormGroup>
                            <Label for="name1" hidden>
                                Name 1
                            </Label>

                            <Controller
                                id="name1"
                                name="name1"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        className="form-control"
                                        invalid={errors.name1 && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.name1 ? (
                                <FormFeedback>
                                    {errors.name1.message}
                                </FormFeedback>
                            ) : null}
                        </FormGroup>

                        <FormGroup>
                            <Label for="email1" hidden>
                                Email 1
                            </Label>

                            <Controller
                                id="email1"
                                name="email1"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        className="form-control"
                                        invalid={errors.email1 && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.email1 ? (
                                <FormFeedback>
                                    {errors.email1.message}
                                </FormFeedback>
                            ) : null}
                        </FormGroup>

                        <FormGroup>
                            <Label for="password1" hidden>
                                Password 1
                            </Label>

                            <Controller
                                id="password1"
                                name="password1"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        placeholder="Password"
                                        className="form-control"
                                        invalid={errors.password1 && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.password1 ? (
                                <FormFeedback>
                                    {errors.password1.message}
                                </FormFeedback>
                            ) : null}
                        </FormGroup>

                        <FormGroup>
                            <Label for="isAdmin1" className="me-2 mt-1">
                                Is Admin
                            </Label>
                            <Controller
                                id="isAdmin1"
                                name="isAdmin1"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="checkbox"
                                        className="form-check d-inline-block"
                                        checked={field.value}
                                        invalid={errors.isAdmin1 && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.isAdmin1 ? (
                                <FormFeedback>
                                    {errors.isAdmin1.message}
                                </FormFeedback>
                            ) : null}
                        </FormGroup>

                        {/* MEMBER 2 */}

                        <h4>Member 2</h4>

                        <FormGroup>
                            <Label for="name2" hidden>
                                Name 2
                            </Label>

                            <Controller
                                id="name2"
                                name="name2"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        className="form-control"
                                        invalid={errors.name2 && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.name2 ? (
                                <FormFeedback>
                                    {errors.name2.message}
                                </FormFeedback>
                            ) : null}
                        </FormGroup>

                        <FormGroup>
                            <Label for="email2" hidden>
                                Email 2
                            </Label>

                            <Controller
                                id="email2"
                                name="email2"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        className="form-control"
                                        invalid={errors.email2 && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.email2 ? (
                                <FormFeedback>
                                    {errors.email2.message}
                                </FormFeedback>
                            ) : null}
                        </FormGroup>

                        <FormGroup>
                            <Label for="password2" hidden>
                                Password 2
                            </Label>

                            <Controller
                                id="password2"
                                name="password2"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        placeholder="Password"
                                        className="form-control"
                                        invalid={errors.password2 && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.password2 ? (
                                <FormFeedback>
                                    {errors.password2.message}
                                </FormFeedback>
                            ) : null}
                        </FormGroup>

                        <FormGroup>
                            <Label for="isAdmin2" className="me-2 mt-1">
                                Is Admin
                            </Label>
                            <Controller
                                id="isAdmin2"
                                name="isAdmin2"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="checkbox"
                                        className="form-check d-inline-block"
                                        checked={field.value}
                                        invalid={errors.isAdmin2 && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.isAdmin2 ? (
                                <FormFeedback>
                                    {errors.isAdmin2.message}
                                </FormFeedback>
                            ) : null}
                        </FormGroup>

                        {showLink === true ? (
                            <div className="my-3">
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
            {/* CODE COMPONENT */}
            <Code value={value} body={body} link={link} token={token} />
        </div>
    );
};

export default VideoKYC;
