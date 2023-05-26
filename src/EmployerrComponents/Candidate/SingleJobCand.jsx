import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../Context/EmployeerDataContext";

export default function SingleJobCand() {
  const { jobId } = useParams();
  const { getJobCandidatesContext } = useData();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetch = async () =>  {
        const candidate = await getJobCandidatesContext(jobId)
        setCandidates(candidate)
    };
    fetch();
  }, [jobId])

  console.log(candidates)
  return <div>SingleJobCand</div>;
}
