import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContex } from "../../context/contex";
import loadingSvg from "../../asset/loading.svg";
import useFetchData from "../../customHooks/useFetchData";
import DonationListComponent from "../../components/DonationStatus.js";
import { Link } from "react-router-dom";
import Search from "../../components/Search";
function AgentInfo({ currentAgent }) {
  const { notify } = useContext(GlobalContex);
  const { agentId } = useParams();
  const [page, setPage] = useState(1);
  const [donatiosData, setDonationsData] = useState({ donations: [] });
  const URL = process.env.REACT_APP_URL;
  const [search, setSearch] = useState("");

  const url = (page) =>
    `${URL}/api/donations?agentId=${agentId}&page=${page}&limit=3`;
  const { loading, data, error, fetchData } = useFetchData(url(page));

  handleSearch = () => {
    if (!loading) fetchData(search);
  };

  useEffect(() => {
    notify(error, "error");
  }, [error]);

  function handleSearch() {
    if (!loading) fetchData(url(1, search));
  }

  useEffect(() => {
    if (!loading) {
      setDonationsData(data);
    }
  }, [loading]);

  return (
    <div>
      <header className="   border-b-4    border-blue-300  dark:border-gray-500 ">
        <div className="   text-xl md:text-2xl mb-3 font-semibold  text-blue-500   dark:text-white   flex  md:gap-0 gap-2 md:flex-row flex-col  md:items-center md:justify-between   ">
          <div>
            <Link className=" hover:text-blue-500" to="/agents">
              {" "}
              Agents
            </Link>
            {agentId ? (
              <Link to={"/agents/" + agentId} className=" hover:text-blue-500">
                {" / " + currentAgent.firstName + " " + currentAgent.lastName}
              </Link>
            ) : null}
          </div>
          <Search setSearch={setSearch} handleSearch={handleSearch} />
        </div>
      </header>

      {loading ? (
        <div className="  top-0   left-0  absolute w-full  items-center flex justify-center  h-full">
          <img src={loadingSvg} />
        </div>
      ) : (
        donatiosData.donations &&
        donatiosData.donations.map((donation) => (
          <DonationListComponent key={donation._id} item={donation} />
        ))
      )}

      {/* page  */}
      <div className="  fixed bottom-5   right-5 flex gap-5   items-center h-11   justify-center  w-40">
        <button
          type="button"
          onClick={() => {
            !loading && fetchData(url(page - 1));
            setPage((preVal) => preVal - 1);
          }}
          disabled={loading || page <= 1}
          className={
            page > 1
              ? "text-white shadow-2xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              : "text-blue-700 border shadow-2xl border-blue-700    focus:outline-none  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center  dark:border-blue-500 dark:text-blue-500  "
          }
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Icon description</span>
        </button>

        <div className=" shadow-2xl rounded-lg bg-blue-600 h-10 w-10 text-white flex items-center justify-center font-semibold text-lg">
          {loading ? (
            <svg
              aria-hidden="true"
              role="status"
              className=" w-5 h-5 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            page
          )}
        </div>
        <button
          onClick={() => {
            !loading && fetchData(url(page + 1));
            setPage((preVal) => preVal + 1);
          }}
          type="button"
          disabled={loading || !donatiosData.next}
          className={
            donatiosData.next
              ? "text-white shadow-2xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              : "text-blue-700 shadow-2xl border border-blue-700   focus:outline-none  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center  dark:border-blue-500 dark:text-blue-500  "
          }
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Icon description</span>
        </button>
      </div>
      {/* page end */}
    </div>
  );
}
export default AgentInfo;
