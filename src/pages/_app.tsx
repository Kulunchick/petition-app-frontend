import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider} from "react-query";
import {ThemeProvider} from "@mui/material";
import theme from "@/styles/theme";

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </ThemeProvider>
    )
}
