import React from 'react'
import axiosConfig from '../lib/axiosConfig';
import {getValueLocalStorage, callToast} from '../lib/functions';
import {useNavigate} from 'react-router-dom'
import { useWebsite } from '../Context/Website';

export default function Home() {

	const navigate = useNavigate();
    const {isLoggedInState, setIsLoggedInState, setUserInfo, userInfo} = useWebsite()

    const logoutUser = () => {
		var loggedToken = getValueLocalStorage('loggedToken');

		axiosConfig({
			method: "post",
			url: "logout",
			headers: { Authorization: `Bearer ${loggedToken}` }
		})
		.then((response) => {
			callToast('success','Your successfully Logout');

            setIsLoggedInState(false);
            setUserInfo({});
            localStorage.setItem("isLoggedIn", false);
            localStorage.setItem("loggedToken", '');
			return navigate("/login");
		})
		.catch((err) => {
			callToast('error','Something is missing');
		});
	};

    if(!isLoggedInState){
        return navigate("/login");
    }


    return (
        <div>
            <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
                <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
                    <div className="ml-10">
                        <a className="mx-2 text-sm font-semibold text-indigo-700">Laravel React Login System </a>
                    </div>
                    <button  className="flex items-center justify-center ml-auto overflow-hidden cursor-pointer" onClick={logoutUser}>
                        Logout
                    </button>
                </div>
                <div className="px-10 mt-6">
                    { userInfo && (<>
                        <h1 className="text-2xl font-bold">Name: {userInfo.name} </h1>
                        <h1 className="text-2xl font-bold">Email: {userInfo.email} </h1>
                    </>)}
                </div>
            </div>
        </div>
    )
}
