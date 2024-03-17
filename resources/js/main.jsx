import * as React from "react";
import * as ReactDOM from "react-dom/client";

import MyApp from "./MyApp";

import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { WebsiteProvider } from './Context/Website';


ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>

        <BrowserRouter>
            <MyApp />
        </BrowserRouter>

        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />

    </React.StrictMode>
);
