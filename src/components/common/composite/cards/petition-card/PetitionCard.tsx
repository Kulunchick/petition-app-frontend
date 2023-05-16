import {FC} from "react";
import moment from "moment";
import {LinearProgress} from "@mui/material";

interface PetitionCardProps {
    id: string;
    title: string;
    fullName: string;
    votes_count: number;
    created_at: Date;
}

const PetitionCard: FC<PetitionCardProps> = ({id, title, fullName, votes_count, created_at}) => {
    return (
        <div>
            <article
                className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span
                      className="text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded bg-gray-200 dark:text-primary-800">
                      <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd"
                                                                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                                                    clipRule="evenodd"></path><path
                          d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                      Petition
                  </span>
                    <span className="text-sm">{moment.utc(created_at).fromNow()}</span>
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    <a href={`/petitions/${id}`}>
                        {title}
                    </a>
                </h2>
                <LinearProgress color="green" variant="determinate" value={votes_count}/>
                <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center space-x-4">
                    <span className="font-medium">
                        {fullName}
                    </span>
                    </div>
                    <a href={`/petitions/${id}`}
                       className="inline-flex items-center font-medium text-green-500 hover:underline">
                        Read more
                        <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </a>
                </div>
            </article>
        </div>
    )
}
export default PetitionCard;