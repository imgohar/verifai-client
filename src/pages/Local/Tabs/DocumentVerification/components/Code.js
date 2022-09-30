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

const Code = ({ file, token, boundary, value }) => {
    const [lang, setLang] = useState('js');

    const handleLang = (event, newLang) => {
        if (newLang !== null) {
            setLang(newLang);
        }
    };
    const [copied, setCopied] = useState(false);

    const [codeText, setCodeText] = useState(`const config = {
    headers: { 
        Authorization: "Bearer ${token}",
        'content-type': 'multipart/form-data; charset=utf-8; boundary=${boundary}',
},
};

const formData = new FormData();
formData.append('file', ${file == null ? 'file' : file.name});

axios.post("${value}", formData, config)
.then((res) => {
    console.log(res);
})
.catch((err) => {    
    console.log(err);
})`);

    useEffect(() => {
        if (lang == 'jsx') {
            setCodeText(`const config = {
    headers: { 
        Authorization: "Bearer ${token}",
        'content-type': 'multipart/form-data; charset=utf-8; boundary=${boundary}',
    },
};

const formData = new FormData();
formData.append('file', ${file == null ? 'file' : file.name});

axios.post("${value}", formData, config)
.then((res) => {
    console.log(res);
})
.catch((err) => {    
    console.log(err);
})`);
        } else if (lang == 'js') {
            setCodeText(`var url = "${value}";
var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Accept", "*/*");
xhr.setRequestHeader("Authorization", "Bearer ${token}");
xhr.setRequestHeader("content-type", "multipart/form-data; charset=utf-8; boundary=${boundary}";

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

var data = "file=${file == null ? 'file' : file.name}";

xhr.send(data);

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
    "content-type": "multipart/form-data; charset=utf-8; boundary=${boundary}",
);

curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$data = "file=${file == null ? 'file' : file.name}";

curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

//for debug only!
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$resp = curl_exec($curl);
curl_close($curl);
var_dump($resp);

`);
        } else if (lang == 'bash') {
            setCodeText(`#!/bin/bash

curl -X GET ${value} -H "Accept: */*" -H "Authorization: Bearer ${token} -H "content-type: multipart/form-data; charset=utf-8; boundary=${boundary}" -d "file=${
                file == null ? 'file' : file.name
            }" 
             
            `);
        } else if (lang == 'py') {
            setCodeText(`import requests
from requests.structures import CaseInsensitiveDict

url = "${value}"

headers = CaseInsensitiveDict()
headers["Accept"] = "*/*"
headers["Authorization"] = "Bearer ${token}"
headers["content-type"] = "multipart/form-data; charset=utf-8; boundary=${boundary}"

data = "file=${file == null ? 'file' : file.name}"

resp = requests.post(url, headers=headers, data=data)

print(resp)
             
            `);
        } else if (lang == 'java') {
            setCodeText(`URL url = new URL("${value}");

HttpURLConnection http = (HttpURLConnection)url.openConnection();
http.setRequestMethod("POST");
http.setDoOutput(true);

http.setRequestProperty("Accept", "*/*");

http.setRequestProperty("Authorization", "Bearer ${token}");

http.setRequestProperty("content-type", "multipart/form-data; charset=utf-8; boundary=${boundary}");

String data = "file=${file == null ? 'file' : file.name}";
byte[] out = data.getBytes(StandardCharsets.UTF_8);

OutputStream stream = http.getOutputStream();
stream.write(out);

System.out.println(http.getResponseCode() + " " + http.getResponseMessage());
http.disconnect();
             
            `);
        }
    }, [token, lang, file, value]);

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
        </>
    );
};

export default Code;
