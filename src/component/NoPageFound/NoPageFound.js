import React from "react";

export const NoPageFound = (props) => {
    return (
        <div className="bg-white border-t border-gray-200">
            <div className="container mx-auto pt-12">
                <div className="mx-auto max-w-md">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <h4 className="text-center font-bold">
                            404 error! Page not found
                        </h4>
                        <p className="text-center">
                            Please confirm the page you want to visit.
                        </p>
                        <hr className="my-4" />
                        <p className="mb-0 text-center">
                            Navigate back to <a href="/" className="text-blue-500">Home</a> or enter the correct URL.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
