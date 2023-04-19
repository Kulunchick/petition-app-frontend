import Link from "next/link";
import React from "react";

const RightBlock = () => {
    return (
        <div
            className="md:w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl md:py-36 md:px-12 max-lg:hidden justify-center">
            <h2 className="text-3xl font-bold mb-2">Already have a account?</h2>
            <div className="border-2 w-10 border-white mb-10 inline-block"></div>
            <br/>
            <Link
                href={"/login"}
                className="border-2 border-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-green-500 inline-block"
            >
                Sign In
            </Link>
        </div>
    )
}

export default RightBlock;