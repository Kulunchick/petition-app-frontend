import {client} from "@/lib/api/instance";
import {getAuthorizationHeader} from "@/lib/api/utils";

export class VoteAPI {
    static async getAllVotes(petitionId: string, page: number = 1, pageLimit: number = 25) {
        const {data} = await client.get(
            `/votes/petitions/${petitionId}/?page=${page}&page_limit=${pageLimit}`
        );
        return data;
    }

    static async vote(petitionId: string) {
        const {data} = await client.get(
            `/votes/petitions/${petitionId}/vote`,
            await getAuthorizationHeader()
        );
        return data;
    }

    static async check(petitionId: string) {
        const {data} = await client.get(
            `/votes/petitions/${petitionId}/check`,
            await getAuthorizationHeader()
        );
        return data;
    }
}