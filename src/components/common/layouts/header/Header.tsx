import {Button, Typography} from "@mui/material";
import React, {Fragment} from "react";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {Popover, Transition} from "@headlessui/react";
import {HiBars3, HiXMark} from "react-icons/hi2";

const Header = () => {
    const {data} = useSession();

    return (
        <Popover
            className="container mx-auto flex items-center border-b-2 px-6 py-2 h-24"
        >
            <Typography
                className="font-semibold"
                color="black"
            >
                <Link href={"/"} className="font-semibold text-black">
                    <span className="text-green-500">Petition</span>App
                </Link>
            </Typography>
            <div className="grow">
                <div className="hidden sm:flex items-center justify-center gap-2 md:gap-8">
                    <Link href={"/"}>Home</Link>
                </div>
            </div>
            <div className="flex grow items-center justify-end sm:hidden">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400
                hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                    <span className="sr-only">Open menu</span>
                    <HiBars3 className="h-6 w-6" aria-hidden="true"/>
                </Popover.Button>
            </div>

            <Popover.Overlay className="fixed inset-0 bg-black opacity-30"/>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel
                    focus
                    className="absolute inset-x-0 top-0 origin-top-right transform p-2"
                >
                    <div
                        className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
                        <div className="px-5 pt-5 pb-6">
                            <div className="flex items-center justify-between">
                                <Typography
                                    className="font-semibold"
                                    color="black"
                                >
                                    <span className="text-green-500">Petition</span>App
                                </Typography>
                                <div className="-mr-2">
                                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400
                                hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                                        <span className="sr-only">Open menu</span>
                                        <HiXMark className="h-6 w-6" aria-hidden="true"/>
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    <Link
                                        href={"/"}
                                        className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2"
                                    >
                                        Home
                                    </Link>
                                </nav>
                            </div>
                            <div className="mt-6 flex flex-col items-center gap-2">
                                {!data ? <div className="w-full flex flex-col items-center gap-2">
                                    <Link
                                        href={"/register"}
                                        className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black md:text-xl w-full
                                        border-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                                    >
                                        Sign up
                                    </Link>
                                    <Link
                                        href={"/login"}
                                        className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black md:text-xl w-full
                                        border-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                                    >
                                        Login
                                    </Link>
                                </div> : <div className="w-full px-2">
                                    <Typography className="mb-2">
                                        {data.user.first_name}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        color="green"
                                        onClick={() => signOut()}
                                        style={{justifyContent: "flex-start"}}
                                        sx={{
                                            textTransform: "none",
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>

            <div className="hidden sm:block">
                {!data ? <div>
                    <Link
                        href={"/register"}
                        className="mr-4 font-semibold border-2 rounded-md p-2 border-green-500 text-green-500"
                    >
                        Sign up
                    </Link>
                    <Link href={"/login"} className="font-semibold">
                        Login
                    </Link>
                </div> : <div className="flex items-center gap-x-2">
                    <Typography>
                        {data.user.first_name}
                    </Typography>
                    <Button
                        className="font-semibold"
                        variant="outlined"
                        fullWidth
                        color="green"
                        onClick={() => signOut()}
                        sx={{
                            textTransform: "none",
                        }}
                    >
                        Logout
                    </Button>
                </div>}
            </div>
        </Popover>
    )
}

export default Header;