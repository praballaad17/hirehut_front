import React, { Suspense } from "react";
import ReactDom from "react-dom";
import { PROFILENAV } from "../../constants/variables";
import { Link, Route, Routes } from "react-router-dom";
import JobOverviewModal from "./JobOverviewModal";
import RelatedModal from "./RelatedModal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function JobDesModal({ open, close, job }) {
  const type = "";

  if (!open) return;
  return ReactDom.createPortal(
    <>
      <div onClick={close} className="modal-box"></div>
      <div className="modal rounded-t-xl overflow-y-scroll">
        <div className="flex w-full justify-end px-8 py-6" onClick={close}>
          <i className="fa-solid fa-xmark rounded-full bg-slate-100 p-2"></i>
        </div>
        <div className="px-44 capitalize">
          <div>
            <div className="inline-block px-6">
              <div className="w-24 h-24 bg-slate-50 inline-block"></div>
            </div>
            <div className="inline-block">
              <div className="text-3xl">{job.title}</div>
              <div className="text-3xl hover:underline cursor-pointer">
                {job.profileId.name}
              </div>
              <p>{job.profileId.pitch}</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-4">
            <Tabs className=" col-span-3">
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Related</Tab>
              </TabList>

              <TabPanel>
                <JobOverviewModal job={job} />
              </TabPanel>

              <TabPanel>
                <RelatedModal />
              </TabPanel>
            </Tabs>

            <div className="col-span-1">
              <div className="border border-slate-300 p-3">
                <h2>about {job.profileId.name}</h2>
                <h3 className="font-bold">Website</h3>
                <a
                  href={`https://${job.profileId.website}`}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                  rel="noopener noreferrer"
                >
                  {job.profileId.website}
                </a>
                <h3 className="font-bold">Location</h3>
                <p className="">{job.profileId.location}</p>
                <h3 className="font-bold">Company Size</h3>
                <p className="">{job.profileId.employeecount} people</p>
              </div>
              <div className="border border-slate-300 p-3">
                <h2>Jobs At {job.profileId.name}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
}
