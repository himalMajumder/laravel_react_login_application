import React, { createContext, useContext, useState, useEffect } from "react";
import axiosConfig, { setCsrfToken } from "../lib/axiosConfig";
import { isLoggedInCheck, getValueLocalStorage, setValueLocalStorage } from "../lib/functions";
import { useNavigate,Navigate } from "react-router-dom";

const WebsiteContext = createContext();

export function useWebsite() {
    return useContext(WebsiteContext);
}

export function WebsiteProvider({ children }) {
    const [isLoggedInState, setIsLoggedInState] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    /**
     * Fetch User Information
     */
    const loadUser = async () => {
        try {
            var loggedToken = getValueLocalStorage();
            await axiosConfig({
                method: "post",
                url: "user",
                headers: { Authorization: `Bearer ${loggedToken}` }

            })
                .then((response) => {
                    setIsLoggedInState(true);
                    localStorage.setItem("isLoggedIn", true);

                    if(response.data && response.data.user){
                        setUserInfo(response.data.user);
                        navigate('/');
                    }
                })
                .catch((err) => {
                    localStorage.setItem("isLoggedIn", false);
                    localStorage.setItem("loggedToken", '');
                    navigate('/login');
                });
        }
        catch (error) {
            localStorage.setItem("isLoggedIn", false);
            localStorage.setItem("loggedToken", '');
            navigate('/login');
        }
    }

    useEffect(() => {
        /**
         * Set sanctum csrf cookie
         */
        setCsrfToken();

        /**
        * Check User Information in Local store
        */
        if (isLoggedInCheck()) {
            loadUser();
        }
        else {
            setValueLocalStorage('','loggedToken');
            setValueLocalStorage(false,'isLoggedIn');
            setIsLoggedInState(false);
            setUserInfo({});
            navigate('/login');
        }
    }, []);



    const value = {
        isLoggedInState,
        setIsLoggedInState,
        userInfo,
        setUserInfo,
    };

    return (
        <WebsiteContext.Provider value={value}>
            {children}
        </WebsiteContext.Provider>
    );
}
