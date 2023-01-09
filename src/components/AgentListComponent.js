import React from "react";
import { Link } from "react-router-dom";

function AgentListComponent({ agent, setCurrentAgent }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="flex  items-center   px-2 py-1 md:px-6 md:py-4   font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {agent.profileImage && agent.profileImage.url ? (
          <img
            className="w-12 h-12 rounded-full"
            src={agent.profileImage.url}
            alt="img"
          />
        ) : (
          <svg
            className="w-14 h-14 text-gray-200 dark:text-gray-700"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}
        <div className="pl-3 text-start">
          <div className="text-base font-semibold">
            {agent.firstName + " " + agent.lastName}
          </div>
          <div className="font-normal text-gray-500">{agent.email}</div>
        </div>
      </th>
      <td className="px-6 py-4 text-center dark:text-gray-200 text-gray-700     ">
        {agent.phoneNo}
      </td>
      <td className="px-6 py-4  ">
        <div className="flex items-center justify-center dark:text-gray-200 text-gray-700">
          {agent.role}
        </div>
      </td>
      <td className="px-6 py-4  text-center">
        <Link
          to={`/agents/` + agent._id}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          <div onClick={() => setCurrentAgent(agent)}>more Info</div>
        </Link>
      </td>
    </tr>
  );
}

export default AgentListComponent;