import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";


import App from "./App";
import memoryUtil from "./utils/memoryUtil";
import localUtil from "./utils/localUtil";

const user = localUtil.getUser();
memoryUtil.user = user;

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root'));