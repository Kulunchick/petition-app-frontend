interface VotePageDTO {
    current_page: number;
    pages_count: number;
    page_limit: number;
    votes: VoteDTO[];
}