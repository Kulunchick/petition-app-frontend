import {getSession} from "next-auth/react";

export const getAuthorizationHeader = async () => {
    const session = await getSession();
    return {
        headers: {Authorization: `Bearer ${session?.user.token}`},
    };
};