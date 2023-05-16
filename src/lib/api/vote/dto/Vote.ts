interface Vote {
    user: {
        id: string,
        first_name: string,
        last_name: string,
        email: string,
        gender: string,
    },
    petition: Petition
    created_at: Date
}