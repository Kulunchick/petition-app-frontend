import React, {ReactNode} from "react";
import Head from 'next/head';
import config from "@/config";
import Header from "@/components/common/layouts/header";

interface PageLayoutProps {
    title?: string;
    description?: string;
    children?: ReactNode;
    hasHeader?: boolean;
    hasFooter?: boolean;
    className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
                                                   title,
                                                   description,
                                                   children,
                                                   hasHeader = true,
                                                   hasFooter = true,
                                                   className,
                                               }: PageLayoutProps) => {
    const metaTitle = title ? title : config.service;
    return (
        <div>
            <Head>
                <title>{metaTitle}</title>
                <meta property="og:title" content={metaTitle}/>
                <meta property="og:image" content="/assets/preview.jpg"/>
                <meta property="og:type" content="website"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                {description && (
                    <meta property="og:description" content={description}/>
                )}
            </Head>

            <div className={className}>
                {hasHeader && (
                    <>
                        <Header/>
                    </>
                )}
                {children}
                {hasFooter && (
                    <div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default PageLayout;