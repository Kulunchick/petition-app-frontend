import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import React from "react";
import Link from "next/link";

const Header = () => {
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
                className="flex justify-around"
            >
                <Typography
                    className="font-semibold"
                    color="black"
                >
                    <span className="text-green-500">Petition</span>App
                </Typography>
                <Box>
                    <Link href={'/'}>
                        Home
                    </Link>
                </Box>
                <Box className="flex items-center gap-8">
                    <Link
                        className="font-semibold"
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
            </Toolbar>
        </AppBar>
    )
}

export default Header;