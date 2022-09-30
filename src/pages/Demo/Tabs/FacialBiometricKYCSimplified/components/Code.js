import React, { Fragment, useState, useEffect } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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

const Code = ({ value, link, token }) => {
    const [lang, setLang] = useState('js');

    const handleLang = (event, newLang) => {
        if (newLang !== null) {
            setLang(newLang);
        }
    };
    const [copied, setCopied] = useState(false);
    const [iframeText, setIframeText] = useState(
        `<iframe src="Link generated from api request" allow="camera" allowfullscreen></iframe>`
    );

    const [codeText, setCodeText] = useState(`const config = {
    headers: { Authorization: "Bearer ${token}" },
};

axios.get("${value}", config)
.then((res) => {
    console.log(res);
})
.catch((err) => {    
    console.log(err);
})`);

    useEffect(() => {
        setIframeText(
            `<iframe src="${
                link == '' ? 'Link generated from api request' : link
            }" allow="camera" allowfullscreen></iframe>`
        );
    }, [link]);

    useEffect(() => {
        if (lang == 'jsx') {
            setCodeText(`const config = {
    headers: { Authorization: "Bearer ${token}" },
};

axios.get("${value}", config)
.then((res) => {
    console.log(res);
})
.catch((err) => {    
    console.log(err);
})`);
        } else if (lang == 'js') {
            setCodeText(`var url = "${value}";
var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Accept", "*/*");
xhr.setRequestHeader("Authorization", "Bearer ${token}");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

xhr.send();

`);
        } else if (lang == 'php') {
            setCodeText(`<?php
$url = "${value}";
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$headers = array(
   "Accept: */*",
   "Authorization: Bearer ${token}",
);

curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
//for debug only!
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$resp = curl_exec($curl);
curl_close($curl);
var_dump($resp);
`);
        } else if (lang == 'bash') {
            setCodeText(`#!/bin/bash

curl -X GET ${value} -H "Accept: */*" -H "Authorization: Bearer ${token}" 
             
            `);
        } else if (lang == 'py') {
            setCodeText(`import requests
from requests.structures import CaseInsensitiveDict

url = "${value}"

headers = CaseInsensitiveDict()
headers["Accept"] = "*/*"
headers["Authorization"] = "Bearer ${token}"

resp = requests.get(url, headers=headers)

print(resp.status_code)
             
            `);
        } else if (lang == 'java') {
            setCodeText(`URL url = new URL("${value}");

HttpURLConnection http = (HttpURLConnection)url.openConnection();
http.setRequestProperty("Accept", "*/*");

http.setRequestProperty("Authorization", "Bearer ${token}");

System.out.println(http.getResponseCode() + " " + http.getResponseMessage());
http.disconnect();
             
            `);
        }
    }, [value, token, lang]);

    const onCopy = () => {
        setCopied(true);
        toast.success(<ToastSuccess />);
    };

    return (
        <>
            <h4 className="mt-5">Code: </h4>
            <p className="lead fs-6">
                Send a request by using axios or any api client to sahal
                backend.
            </p>
            <div
                className="border border-white py-4 px-3 bg-dark-v2 text-white mb-3"
                style={{ borderRadius: '10px', overflowX: 'auto' }}
            >
                <div className="text-end">
                    <ToggleButtonGroup
                        value={lang}
                        color="primary"
                        exclusive
                        onChange={handleLang}
                    >
                        <Tooltip title="javaScript">
                            <ToggleButton value="js" aria-label="js">
                                <i
                                    className={`${
                                        lang === 'js'
                                            ? 'selected-btn'
                                            : 'not-selected-btn'
                                    } bi bi-filetype-js fs-4`}
                                ></i>
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="React / JSX">
                            <ToggleButton value="jsx" aria-label="jsx">
                                <i
                                    className={`${
                                        lang === 'jsx'
                                            ? 'selected-btn'
                                            : 'not-selected-btn'
                                    } bi bi-filetype-jsx fs-4`}
                                ></i>
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="PHP">
                            <ToggleButton value="php" aria-label="php">
                                <i
                                    className={`${
                                        lang === 'php'
                                            ? 'selected-btn'
                                            : 'not-selected-btn'
                                    } bi bi-filetype-php fs-4`}
                                ></i>
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="Bash / Curl">
                            <ToggleButton value="bash" aria-label="bash">
                                <i
                                    className={`${
                                        lang === 'bash'
                                            ? 'selected-btn'
                                            : 'not-selected-btn'
                                    } bi bi-filetype-sh fs-4`}
                                ></i>
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="Python">
                            <ToggleButton value="py" aria-label="py">
                                <i
                                    className={`${
                                        lang === 'py'
                                            ? 'selected-btn'
                                            : 'not-selected-btn'
                                    } bi bi-filetype-py fs-4`}
                                ></i>
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="Java">
                            <ToggleButton value="java" aria-label="java">
                                <i
                                    className={`${
                                        lang === 'java'
                                            ? 'selected-btn'
                                            : 'not-selected-btn'
                                    } bi bi-filetype-java fs-4`}
                                ></i>
                            </ToggleButton>
                        </Tooltip>
                    </ToggleButtonGroup>
                    <Tooltip title="Copy">
                        <IconButton className="text-white">
                            <CopyToClipboard onCopy={onCopy} text={codeText}>
                                <ContentCopyIcon
                                    fontSize="medium"
                                    className="cursor-pointer mb-3"
                                />
                            </CopyToClipboard>
                        </IconButton>
                    </Tooltip>
                </div>

                <pre>{codeText}</pre>
            </div>

            <h4 className="mt-5">Embed With Iframe: </h4>
            <p className="lead fs-6">
                You need to add the link you received from the api call into the
                iframe source. Also make sure that allowfullscreen is added in
                attributes of iframe and camera is allowed as shown in below
                code example
            </p>

            <p className="lead fs-6">
                Send a get request by using axios, fetch or jQuery to sahal
                backend and get the link.
            </p>
            <div
                className="border border-white py-4 px-3 bg-dark-v2 text-white mb-3"
                style={{ borderRadius: '10px' }}
            >
                <div className="row">
                    <div className="col-11">
                        <code className="text-white">
                            {`<iframe
    src="${link === '' ? 'Link generated from api request' : link}"
    allow="camera"
    allowfullscreen></iframe>`}
                        </code>
                    </div>

                    <div className="col-1 text-end">
                        <Tooltip title="Copy">
                            <IconButton className="text-white">
                                <CopyToClipboard
                                    onCopy={onCopy}
                                    text={iframeText}
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
            <p className="lead fs-6">
                If you are using react then the allowfullscreen will be replaced
                by allowFullScreen
            </p>
        </>
    );
};

export default Code;
