import React, { useState } from "react";
import { Link } from "react-router-dom";
import { acceptJobApplication } from "../../services/employeerServices";

export default function CandidateCard({ candidate, jobId }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const renderContent = () => {
    const content = candidate.userId.profileId.bio;
    if (isExpanded) {
      return (
        <div className="whitespace-pre-wrap	">
          {content}
          <button onClick={toggleContent} className="text-blue-500 mx-4">
            Show less
          </button>
        </div>
      );
    } else {
      // Display a truncated version of the content
      const truncatedContent = content.substring(0, 100) + "...";
      return (
        <div>
          {truncatedContent}
          <button onClick={toggleContent} className="text-blue-500 mx-4">
            Show more
          </button>
        </div>
      );
    }
  };

  return (
    <div className="">
      <div className="flex flex-col items-center border-2 border-slate-400 rounded-lg p-4">
        {candidate.userId.profileId.profileUrl.length ? (
          <img src={candidate.userId.profileId.profileUrl} />
        ) : (
          <div className="w-32 h-32 rounded-full border border-slate-400 my-4"></div>
        )}
        <Link
          to={`/candidate-details/${candidate.userId._id}`}
          className="font-bold text-lg hover:underline capitalize"
        >
          {candidate.userId.profileId.name}
        </Link>
        <div>{candidate.userId.profileId.experiance} year/s experiance.</div>
        <div>
          <span className="font-bold capitalize">location: </span>
          {candidate.userId.profileId.city}, {candidate.userId.profileId.state}
        </div>
        <div>
          {candidate.userId.profileId.twitter.length ? (
            <a
              className="mx-2 text-lg hover:text-blue-500"
              target="_blank"
              href={`${candidate.userId.profileId.twitter}`}
              rel="noreferrer"
            >
              <i class="fa-brands fa-twitter"></i>
            </a>
          ) : (
            <></>
          )}
          {candidate.userId.profileId.linkedIn.length ? (
            <a
              className="mx-2 text-lg hover:text-blue-900"
              target="_blank"
              href={`${candidate.userId.profileId.linkedIn}`}
            >
              <i class="fa-brands fa-linkedin"></i>
            </a>
          ) : (
            <></>
          )}
          {candidate.userId.profileId.github.length ? (
            <a
              className="mx-2 text-lg hover:text-green-600"
              target="_blank"
              href={`${candidate.userId.profileId.github}`}
            >
              <i class="fa-brands fa-github"></i>
            </a>
          ) : (
            <></>
          )}
          {candidate.userId.profileId.portfolio.length ? (
            <a
              className="mx-2 text-lg hover:text-yellow-400"
              target="_blank"
              href={`${candidate.userId.profileId.portfolio}`}
            >
              <i class="fa-solid fa-user"></i>
            </a>
          ) : (
            <></>
          )}
        </div>
        <div>{renderContent()}</div>
        <div>
          <button
            onClick={() => acceptJobApplication(jobId, candidate.userId._id)}
            className="rounded-lg border border-green-500 text-green-500 px-4 py-2 hover:bg-green-500 hover:text-white"
          >
            <i className="fa-solid fa-check mr-2"></i>
            accept
          </button>
        </div>
      </div>
    </div>
  );
}
