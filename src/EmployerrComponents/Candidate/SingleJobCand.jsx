import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../Context/EmployeerDataContext";
import noCandidate from "../../assets/no-candidate.jpg";
import { useUser } from "../../Context/userContext";
import CandidateCard from "./CandidateCard";

export default function SingleJobCand() {
  const { jobId } = useParams();
  const { setLoading, loading } = useUser();
  const { getJobCandidatesContext, getJobContext } = useData();
  const [candidates, setCandidates] = useState([]);
  const [job, setJob] = useState();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const candidate = await getJobCandidatesContext(jobId);
      const res = await getJobContext(jobId);
      setCandidates(candidate);
      setJob(res);
      setLoading(false);
    };
    fetch();
  }, [jobId]);

  console.log(candidates);
  return (
    <div className="m-4">
      <div>
        <h1 className="text-2xl font-bold">Candidates ({candidates.length})</h1>
      </div>
      <div>
        <h2 className="text-xl font-bold">{job?.title}</h2>
      </div>
      {candidates.length ? (
        <div className="grid grid-cols-3 gap-4 my-4">
          {candidates.map((candidate) => (
            <CandidateCard candidate={candidate} />
          ))}
        </div>
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center">
            <img className="w-80 h-80" src={noCandidate} />
            <div>No Candidates</div>
          </div>
        </div>
      )}
    </div>
  );
}
