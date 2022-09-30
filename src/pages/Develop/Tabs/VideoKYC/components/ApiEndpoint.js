import React, { Fragment, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const ToastSuccess = () => (
    <Fragment>
        <div className="toastify-header pb-0">
            <div className="title-wrapper">
                <h6 className="toast-title">Copied To Clipboard !</h6>
            </div>
        </div>
    </Fragment>
);

const ApiEndpoint = ({ value }) => {
    const [copied, setCopied] = useState(false);

    const requiredFields = `
{
    start_date: 'required|date|after_or_equal:now',
    end_date: 'required|date|after_or_equal:start_date',
    restrict_access: 'required|boolean',
    notes: 'nullable|string|max:5000',
    members: [{
        name: 'nullable|string|max:255',
        email: 'required|email',
        password: 'required|string|min:3|max:255',
        is_admin: 'required|boolean',
    }, {
        name: 'nullable|string|max:255',
        email: 'required|email',
        password: 'required|string|min:3|max:255',
        is_admin: 'required|boolean',
    }],
},`;

    const onCopy = () => {
        setCopied(true);
        toast.success(<ToastSuccess />);
    };

    return (
        <>
            <h4 className="mt-3">Api Endpoint</h4>
            <div
                className="border border-white py-4 px-3 bg-dark-v2 text-white mb-3"
                style={{ borderRadius: '10px' }}
            >
                <div className="row">
                    <div className="col-11">
                        <code className="text-white">{value}</code>
                    </div>
                    <div className="col-1">
                        <div className="text-end">
                            <Tooltip title="Copy">
                                <IconButton className="text-white">
                                    <CopyToClipboard
                                        onCopy={onCopy}
                                        text={value}
                                    >
                                        <ContentCopyIcon
                                            fontSize="small"
                                            className="cursor-pointer"
                                        />
                                    </CopyToClipboard>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <p className="lead fs-6">
                You need to send a <strong className="fw-bold"> POST </strong>
                request to this api endpoint. You also need to pass your api
                token either test or live in headers. Token must be prefixed
                with Bearer and its name must be Authorization. You need to pass
                all the required attributes in form body.
            </p>
            <h4 className="mt-5">Required Fields</h4>
            <div
                className="border border-white py-4 px-3 bg-dark-v2 text-white mb-3"
                style={{ borderRadius: '10px' }}
            >
                <div className="row">
                    <div className="col-11">
                        <pre className="text-white">{requiredFields}</pre>
                    </div>
                    <div className="col-1">
                        <div className="text-end">
                            <Tooltip title="Copy">
                                <IconButton className="text-white">
                                    <CopyToClipboard
                                        onCopy={onCopy}
                                        text={requiredFields}
                                    >
                                        <ContentCopyIcon
                                            fontSize="small"
                                            className="cursor-pointer"
                                        />
                                    </CopyToClipboard>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <h6>Rules: </h6>
            <ul>
                <li>
                    Start And End Dates must be greater than today or equal to
                    today.
                </li>
                <li>
                    The end date must be a date after or equal to start date
                </li>
                <li>All Fileds are required except Member names and notes</li>
                <li>Password must be equal to or greater than 6</li>
                <li>The body format must matched as shown above</li>
            </ul>
        </>
    );
};

export default ApiEndpoint;
