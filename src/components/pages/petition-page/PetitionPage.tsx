import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {PetitionAPI} from "@/lib/api/petition/PetitionAPI";
import PageLayout from "@/components/common/layouts/page-layout";
import moment from "moment";
import {CircularProgressbarWithChildren} from "react-circular-progressbar";
import {ThreeDots} from "react-loader-spinner";
import {Button, Pagination, Typography} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import Link from "next/link";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {VoteAPI} from "@/lib/api/vote/VoteAPI";
import {BsCheckCircle} from 'react-icons/bs';
import {VscError} from 'react-icons/vsc';
import {MdDeleteForever} from 'react-icons/md';
import VoteList from "@/components/pages/petition-page/VoteList";

const PetitionPage = () => {
    const MySwal = withReactContent(Swal);
    const router = useRouter();
    const session = useSession();
    const petitionId = router.query.petitionId as string;
    const [page, setPage] = useState(1)
    const {isLoading, isError, data} = useQuery<PetitionDTO>(
        ['petition', petitionId],
        () => PetitionAPI.getPetition(petitionId),
        {
            enabled: router.isReady,
            refetchOnWindowFocus: false,
            retry: false,
        },
    );

    useEffect(
        () => setPage(Number(router.query.page as string) || 1),
        [router]
    )

    if (isError) {
        MySwal.fire({
            icon: 'error',
            title: 'Not Found',
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(
            () => router.push('/'),
            1000
        )
    }

    const {data: checkData} = useQuery<CheckVoteDTO>(
        ["check", petitionId],
        () => VoteAPI.check(petitionId),
        {
            enabled: router.isReady && !isError && !isLoading && Boolean(session.data),
            refetchOnWindowFocus: false,
            retry: false,
        },
    )

    const {data: votes} = useQuery<VotePageDTO>(
        ["votes", petitionId, page],
        () => VoteAPI.getAllVotes(petitionId, page),
        {
            enabled: router.isReady && !isError && !isLoading,
            refetchOnWindowFocus: false,
            retry: false,
        },
    )

    const handleVote = useCallback(
        async () => {
            await VoteAPI.vote(petitionId)
            router.reload()
        },
        [router, petitionId]
    )

    const deletePetition = useCallback(
        async () => {
            await PetitionAPI.deletePetition(petitionId)
            await router.push("/")
        },
        [router, petitionId]
    )

    return (
        <PageLayout
            hasHeader={true}
            hasFooter={true}
        >
            {isLoading && <div className="flex justify-center">
                <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#4fa94d"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                />
            </div>}
            {data && <div className="container mx-auto flex flex-wrap py-6">
                <section className="w-full lg:w-2/3 flex flex-col items-center px-3">
                    <article className="w-full flex flex-col shadow my-4 relative">
                        <div className="bg-white flex flex-col justify-start p-6">
                            <a href="#" className="text-green-500 text-sm font-bold uppercase pb-4">Petition</a>
                            <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">{data?.title}</a>
                            <p className="text-sm pb-8">
                                By <a href="#"
                                      className="font-semibold hover:text-gray-800">{data?.user.first_name} {data?.user.last_name}</a>,
                                Published
                                on {moment.utc(data.created_at).format("MMM Do, YYYY")}
                            </p>
                            <div className="prose lg:prose-xl"
                                 dangerouslySetInnerHTML={{__html: data.description}}></div>
                        </div>
                        {checkData && checkData.is_your_petition &&
                            <Button
                                onClick={deletePetition}
                                size="small"
                                className="absolute top-0 right-0 m-3 text-white bg-red-500 hover:bg-white hover:text-red-500"
                            >
                                <MdDeleteForever size={20}/>
                            </Button>
                        }
                    </article>
                </section>

                <div className="w-full lg:w-1/3 flex flex-col items-center px-3">

                    <div className="w-full bg-white shadow flex flex-col my-4 p-6 items-center">
                        <p className="text-xl font-semibold pb-5">Voting</p>
                        <div style={{width: "170px"}}>
                            <CircularProgressbarWithChildren
                                value={data.votes_count}
                                styles={{
                                    path: {
                                        stroke: "#22c55e"
                                    },
                                    trail: {
                                        // Trail color
                                        stroke: '#d6d6d6',
                                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                        strokeLinecap: 'butt',
                                        // Rotate the trail
                                        transform: 'rotate(0.25turn)',
                                        transformOrigin: 'center center',
                                    },
                                }}
                            >
                                <Typography variant="h5">
                                    {data.votes_count}
                                </Typography>
                                <span>votes of out 100</span>
                                <span>required</span>
                            </CircularProgressbarWithChildren>
                        </div>
                        <Typography
                            className="mt-3"
                        >
                            Status: {(data.votes_count >= 100) ? "The required amount is dialed" : "Collection of signatures is in progress"}
                        </Typography>
                        <div className="border-2 w-full border-gray-300 m-5 inline-block"></div>
                        {!session.data &&
                            <Link
                                href={"/login"}
                                className="w-1/2 text-center border-2 border-green-500 bg-green-500 text-white rounded-full px-5 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
                            >
                                Login to Vote
                            </Link>
                        }
                        {(session.data && checkData?.can_vote) &&
                            <Button
                                onClick={handleVote}
                                className="bg-green-500 text-white hover:text-green-500 hover:bg-white"
                                sx={{
                                    border: 2,
                                    borderColor: "green"
                                }}
                                fullWidth
                            >
                                Vote
                            </Button>
                        }
                        {checkData && !checkData.can_vote && !checkData.is_your_petition &&
                            <Typography
                                className="flex items-center gap-2"
                            >
                                <BsCheckCircle/> You voted for this petition
                            </Typography>
                        }
                        {checkData && checkData.is_your_petition &&
                            <Typography
                                className="flex items-center gap-2"
                            >
                                <VscError/> You can&apos;t vote on your petition
                            </Typography>
                        }
                    </div>
                </div>
                <div
                    className="w-full lg:w-2/3 shadow px-3 flex flex-col"
                >
                    {votes && <VoteList data={votes}/>}
                    <Pagination
                        className={"flex justify-center"}
                        count={votes?.pages_count}
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
            </div>}
        </PageLayout>
    )
}

export default PetitionPage;