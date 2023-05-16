import {FC} from "react";
import moment from "moment";

interface VoteCardProps {
    fullName: string;
    created_at: Date;
}

const VoteCard: FC<VoteCardProps> = ({fullName, created_at}) => {
  return (
      <>
          <tr className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {fullName}
              </th>
              <td className="px-6 py-4 text-right">
                  {moment.utc(created_at).fromNow()}
              </td>
          </tr>
      </>
  )
}

export default VoteCard;