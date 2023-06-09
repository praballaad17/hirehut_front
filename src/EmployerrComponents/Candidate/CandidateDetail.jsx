import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../Context/userContext";
import { fetchJobSeekerProfile } from "../../services/jobseekerServices";
import { GENDEROBJ } from "../../constants/variables";

export default function CandidateDetail() {
  const { candidateId } = useParams();
  const { addToast } = useUser();
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await fetchJobSeekerProfile(candidateId);
        console.log(res);
        setProfile(res);
      } catch (error) {
        console.log(error);
        addToast("error to fetch profile", true);
      }
    };
    fetch();
  }, []);
  if (!profile) return;

  return (
    <div className="p-4 grid grid-cols-2">
      <div>
        <div className="font-bold capitalize text-2xl">{profile.name}</div>
        <div>
          Location: {profile.city}, {profile.state}
        </div>
        <div>
          {profile.experiance} {profile.experiance > 1 ? "years" : "year"} of
          experinace
        </div>
        <div>
          <span>Gender: </span> {GENDEROBJ[profile.gender]}
        </div>
        <div className="whitespace-pre-wrap">
          <span className="text-lg font-bold">Bio</span>
          <br />
          {profile.bio}
        </div>
        <div className="mt-4">
          <span className="text-lg font-bold">Achivements</span> <br />
          {profile.achivements}
        </div>
      </div>

      <div>
        <div>
          {profile.profileUrl.length ? (
            <img src={profile.profileUrl} />
          ) : (
            <div className="w-40 h-40 rounded-full border border-slate-400"></div>
          )}
          <h1 className="text-xl font-bold">Socials</h1>
          {profile.twitter.length ? (
            <a
              className="mx-2 text-2xl hover:text-blue-500"
              target="_blank"
              href={profile.twitter}
              rel="noreferrer"
            >
              <i class="fa-brands fa-twitter"></i>
            </a>
          ) : (
            <></>
          )}
          {profile.linkedIn.length ? (
            <a
              className="mx-2 text-2xl hover:text-blue-900"
              href={profile.linkedIn}
            >
              <i class="fa-brands fa-linkedin"></i>
            </a>
          ) : (
            <></>
          )}
          {profile.github.length ? (
            <a
              className="mx-2 text-2xl hover:text-green-600"
              href={profile.github}
            >
              <i class="fa-brands fa-github"></i>
            </a>
          ) : (
            <></>
          )}
          {profile.portfolio.length ? (
            <a
              className="mx-2 text-2xl hover:text-yellow-400"
              href={profile.portfolio}
            >
              <i class="fa-solid fa-user"></i>
            </a>
          ) : (
            <></>
          )}
        </div>

        <div className="mt-4">
          <span className="text-lg font-bold">Education</span> <br />
          {profile.education.map((exp, idx) => (
            <div className="bg-slate-200 rounded-lg my-2 p-2">
              <div className="text-lg">{exp.education}</div>
              <div className="text-lg">{exp.granduation}</div>
              <div className="">{exp.degree}</div>
              <div>
                {exp?.gpa} / {exp.max} GPA
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <span className="text-lg font-bold">Work Experiance</span> <br />
          {profile.workexperiance.map((exp, idx) => (
            <div className="bg-slate-200 rounded-lg my-2 p-2">
              <div className="text-xl font-bold flex justify-between">
                {exp.company}
              </div>
              <div className="text-lg">{exp.title}</div>
              <div className="">
                {exp.startDate} - {exp?.isCurrent ? "Current" : exp.endDate}
              </div>
              <div className="font-bold text-lg">Description</div>
              <p className="whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
