import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'
import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider} from "react-query";
import {CssBaseline, StyledEngineProvider, ThemeProvider} from "@mui/material";
import theme from "@/styles/theme";
import {SessionProvider} from "next-auth/react";
import React from "react";
import {ReactQueryDevtools} from "react-query/devtools";

const queryClient = new QueryClient();

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </StyledEngineProvider>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </SessionProvider>
    )
}
