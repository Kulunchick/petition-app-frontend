import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import React from "react";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

const Header = () => {
    const {data} = useSession();

    return (
        <AppBar
            className="text-black font-semibold"
            sx={{
                backgroundColor: "#fff"
            }}
            position="static"
        >
            <Toolbar
                disableGutters
                className="flex xl:justify-around max-xl:justify-between px-4"
            >
                <Typography
                    className="font-semibold flex"
                    color="black"
                >
                    <Link href={"/"} className="font-semibold text-black">
                        <span className="text-green-500">Petition</span>App
                    </Link>
                </Typography>
                <Box className="flex font-semibold text-black">
                    <Link href={'/'}>
                        Home
                    </Link>
                </Box>
                {!data && (
                    <Box className="flex items-center gap-8">
                        <Link
                            className="font-semibold text-black"
                            href={"/login"}
                        >
                            Sign In
                        </Link>
                        <Link
                            href={"/register"}
                            className="border-2 border-green-500 bg-green-500 text-white rounded-full px-5 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
                        >
                            Sign Up
                        </Link>
                    </Box>
                )}
                {data?.user && (
                    <Box className="flex items-center gap-8">
                        <Typography>
                            {data.user.first_name}
                        </Typography>
                        <Button
                            onClick={() => signOut()}
                            className="border-2 border-green-500 bg-green-500 text-white rounded-full px-5 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
                            sx={{
                                textTransform: "none",
                                borderColor: "green",
                                ":hover": {
                                    border: 2,
                                }
                            }}
                            variant="outlined"
                        >
                            Logout
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header;