import Link from "next/link";
import React from "react";

const RightBlock = () => {
    return (
        <div
            className="md:w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl md:py-36 md:px-12 max-lg:hidden"
        >
            <h2 className="text-3xl font-bold mb-2">Hello, Friend</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">Fill up your personal information and start journey with us</p>
            <Link
                href={"/register"}
                className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
            >
                Sign Up
            </Link>
        </div>
    )
}

export default RightBlock;