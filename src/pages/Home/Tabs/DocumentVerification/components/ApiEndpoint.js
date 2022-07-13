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
                You need to send a <strong className="fw-bold"> POST </strong>
                request to this api endpoint. You also need to pass your api
                token either test or live in headers. Token must be prefixed
                with Bearer and its name must be Authorization. You also need to
                send a document image to verify it. It must be send with the
                name of file. It can be either a file or a base 64 string.
            </p>
            <h6>Rules: </h6>
            <ul>
                <li>
                    You also need to pass boundry in headers it can be any
                    randomly generated number. For reference see the code
                    snippets below.
                </li>
                <li>Request must be of type Post.</li>
                <li>Request must consist of header multipart/form-data</li>
                <li>File name must be sent as file.</li>
            </ul>
        </>
    );
};

export default ApiEndpoint;
