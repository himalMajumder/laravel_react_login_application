import React from 'react'

export default function ErrorAlertMessage({ children }) {
    return (
        <div className="mt-1 mb-4 text-sm text-red-800 rounded-lg" role="alert">{ children }</div>
    );
}
