import PageLayout from "@/components/common/layouts/page-layout";
import {TextField, Typography} from "@mui/material";
import dynamic from "next/dynamic";
import React, {useCallback, useState} from "react";
import 'react-quill/dist/quill.snow.css';
import {useSession} from "next-auth/react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {PetitionAPI} from "@/lib/api/petition/PetitionAPI";

const modules = {
    toolbar: [
        [{header: '1'}, {header: '2'}, {header: '3'}, {font: []}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            {list: 'ordered'},
            {list: 'bullet'},
            {indent: '-1'},
            {indent: '+1'},
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}

const ReactQuill = dynamic(
    () => import('react-quill'),
    {
        ssr: false
    }
)

const NewPetitionPage = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const MySwal = withReactContent(Swal);
    const {data} = useSession({
        required: true,
        onUnauthenticated() {
            MySwal.fire({
                icon: 'error',
                title: 'You not authorized',
                showConfirmButton: false,
                timer: 1500
            })
            router.push('/login')
        },
    });

    const handlePublish = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            setButtonDisabled(true)
            if (!title || !description) {
                await MySwal.fire({
                    icon: 'error',
                    title: 'Enter title and description',
                    showConfirmButton: false,
                    timer: 1500
                })
                setButtonDisabled(false)
                return
            }
            await PetitionAPI.addPetition({
                title,
                description
            })
            await MySwal.fire({
                icon: 'success',
                title: 'Published',
                showConfirmButton: false,
                timer: 1500
            })
            await router.push('/')
        },
        [router, MySwal, description, title],
    )

    return (
        <PageLayout>
            <div
                className="mt-14 mb-14 py-8 px-4 p-6 bg-white rounded-lg border border-gray-200 shadow-md max-w-screen-xl mx-auto"
            >
                {data && <form onSubmit={handlePublish}>
                    <div
                        className="px-5"
                    >
                        <Typography
                            variant="h5"
                            className="w-full text-center"
                        >
                            Add new petition
                        </Typography>
                        <Typography
                            className="font-semibold"
                        >
                            Title
                        </Typography>
                        <TextField
                            name="title"
                            value={title}
                            placeholder="Enter Title"
                            className="w-full"
                            onChange={e => {
                                setTitle(e.target.value)
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root.Mui-focused": {
                                    "& > fieldset": {
                                        borderColor: "#22c55e"
                                    }
                                }
                            }}
                        />
                        <Typography
                            className="font-semibold"
                        >
                            Description
                        </Typography>
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            modules={modules}
                        />
                        <button
                            disabled={buttonDisabled}
                            type="submit"
                            className="w-full mt-5 border-2 border-green-500 bg-green-500 text-white rounded-lg px-5 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
                        >
                            Publish
                        </button>
                    </div>
                </form>}
            </div>
        </PageLayout>
    )
}

export default NewPetitionPage;