import React from 'react'
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="bg-gradient-to-r from-purple-300 to-blue-200">
            <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                    <div className="border-t border-gray-200 text-center pt-8">
                        {
                            error && (<>
                                <h1 className="text-9xl font-bold text-purple-400">{error.status}</h1>
                                <h1 className="text-6xl font-medium py-8">oops! {error.statusText}</h1>
                            </>)
                        }
                        <a href='/' className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                            HOME
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
