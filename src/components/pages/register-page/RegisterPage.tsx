import React from "react";
import LeftBlock from "@/components/pages/register-page/components/left-block";
import RightBlock from "@/components/pages/register-page/components/right-block";
import PageLayout from "@/components/common/layouts/page-layout";


const RegisterPage = () => {


    return (
        <PageLayout
            hasHeader={false}
            hasFooter={false}
        >
            <div className="flex flex-col items-center justify-center min-h-screen h-auto py-2 bg-gray-100">
                <main className="flex flex-col items-center justify-center w-full flex-1 md:px-20 text-center">
                    <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 md:max-w-4xl">
                        <LeftBlock/>
                        <RightBlock/>
                    </div>
                </main>
            </div>
        </PageLayout>
    );
}

export default RegisterPage;