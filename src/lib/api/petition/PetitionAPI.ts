import {client} from "@/lib/api/instance";
import {getSession} from "next-auth/react";
import {getAuthorizationHeader} from "@/lib/api/utils";

export class PetitionAPI {
    static async getAllPetitions(page: number = 1, pageLimit: number = 5) {
        const {data} = await client.get(
            `/petitions/?page=${page}&page_limit=${pageLimit}`
        );
        return data;
    }

    static async getPetition(petitionId: string) {
        const {data} = await client.get(
            `/petitions/${petitionId}`
        )
        return data;
    }

    static async addPetition(body: NewPetition) {
        const {data} = await client.post(
            `/petitions/`,
            body,
            await getAuthorizationHeader()
        );
        return data;
    }

    static async deletePetition(petitionId: string) {
        const {data} = await client.delete(
            `/petitions/${petitionId}`,
            await getAuthorizationHeader()
        )
        return data;
    }
}