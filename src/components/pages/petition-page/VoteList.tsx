import {FC} from "react";
import VoteCard from "@/components/common/composite/cards/vote-card";

interface VoteListProps {
    data: VotePageDTO;
}

const VoteList: FC<VoteListProps> = ({data}) => {
    return (
        <div className="w-full flex">
            <table className="w-full text-sm text-left text-gray-500">
                <caption
                    className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                    Subscribers
                </caption>
                <tbody>
                {data && data.votes.map((vote, i) => (
                    <VoteCard
                        key={i}
                        fullName={`${vote.user.first_name} ${vote.user.last_name}`}
                        created_at={vote.created_at}
                    />
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default VoteList;