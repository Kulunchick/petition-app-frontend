import {useQuery} from "react-query";
import {PetitionAPI} from "@/lib/api/petition/PetitionAPI";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import PageLayout from "@/components/common/layouts/page-layout";
import PetitionList from "@/components/pages/main-page/PetitionList";
import {Pagination} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ThreeDots} from "react-loader-spinner";
import Link from "next/link";
import {HiPlus} from "react-icons/hi";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

const MainPage = () => {
    const session = useSession();
    const router = useRouter();
    const [page, setPage] = useState(1);

    useEffect(
        () => setPage(Number(router.query.page as string) || 1),
        [router]
    )

    const {isLoading, isError, data} = useQuery<PetitionPageDTO>(
        ['teachers', page],
        () => PetitionAPI.getAllPetitions(page),
        {
            refetchOnWindowFocus: false,
            retry: false,
        },
    );
    if (isError) {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: "Oops...",
            icon: "error",
            text: "Error"
        })
    }

    return (
        <PageLayout>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="flex justify-between items-center py-2">
                    <span className="font-semibold">
                       Petitions
                    </span>
                    {session.data && <Link
                        href={"/petitions/new"}
                        className="flex items-center border-2 border-green-500 bg-green-500 text-white rounded-full px-5 py-2 font-semibold hover:bg-white hover:text-green-500"
                    >
                        <HiPlus/>
                        New Petition
                    </Link>}
                </div>
                {data && <PetitionList data={data}/>}
                {isLoading && (
                    <div className="flex justify-center">
                        <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color="#4fa94d"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                        />
                    </div>
                )}
                <Pagination
                    className={"flex justify-center"}
                    count={data?.pages_count}
                    page={page}
                    onChange={(event, page) => {
                        setPage(page)
                        const url = {
                            pathname: router.pathname,
                            query: {...router.query, page: page}
                        }
                        router.push(url, undefined, {shallow: true})
                    }}
                    showFirstButton
                    showLastButton
                />
            </div>
        </PageLayout>
    )
}

export default MainPage;