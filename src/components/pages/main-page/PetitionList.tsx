import React, {FC} from "react";
import PetitionCard from "@/components/common/composite/cards/petition-card";

interface PetitionListProps {
    data: PetitionPageDTO;
}

const PetitionList: FC<PetitionListProps> = ({data}) => {
    return (
        <div className="space-y-3">
            {data && data.petitions.map((petition, i) => (
                <PetitionCard
                    key={i}
                    id={petition.id}
                    title={petition.title}
                    fullName={`${petition.user.first_name} ${petition.user.last_name}`}
                    votes_count={petition.votes_count}
                    created_at={petition.created_at}
                />
            ))}
        </div>
    )
}

export default PetitionList;