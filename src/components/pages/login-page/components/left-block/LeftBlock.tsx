import React from "react";
import LoginForm from "@/components/pages/login-page/components/login-form";

const LeftBlock = () => {
    return (
        <div className="max-lg:w-full lg:w-3/5 ms:w-max p-5">
            <div className="text-left font-bold">
                <span className="text-green-500">Petition</span>App
            </div>
            <div className="pt-10 pb-3">
                <h2 className="text-3xl font-bold text-green-500 mb-2">Sign In</h2>
                <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
                <LoginForm/>
            </div>

        </div>
    )
}

export default LeftBlock;