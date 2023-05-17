interface VoteDTO {
    user: {
        id: string,
        first_name: string,
        last_name: string,
        email: string,
        gender: string,
    },
    petition: PetitionDTO
    created_at: Date
}