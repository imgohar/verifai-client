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
                You need to send a <strong className="fw-bold"> GET </strong>
                request to this api endpoint. You also need to pass your api
                token either test or live in headers. Token must be prefixed
                with Bearer and its name must be Authorization.
                {/* <strong className="fw-bold"> USER_REFERENCE </strong> is the
                unique identifier it will be unique for every user and it can be
                email address or any unique string. The reference must be at
                least 6 characters. */}
            </p>
            {/* <h6>Rules: </h6>
            <ul>
                <li>User Reference can be email or a unique string.</li>
                <li>User Reference must not be null or empty string.</li>
                <li>User Reference must be unique.</li>
                <li>User Reference must be at least 6 characters.</li>
            </ul> */}
        </>
    );
};

export default ApiEndpoint;
