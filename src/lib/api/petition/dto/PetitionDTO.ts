interface PetitionDTO {
    id: string;
    title: string;
    description: string;
    votes_count: number;
    created_at: Date;
    user: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        gender: string;
    };
}