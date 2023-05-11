import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

export default function Resume() {
  return (
    <div className="grid grid-cols-3 gap-4 border-2 border-slate-300 w-90 h-full p-5 mt-5">
      <div>
        <h2 className="font-bold">Upload your resume</h2>
        <p>Upload your most up-to-date resume File types: PDF, DOCX, PPTX</p>
      </div>
      <label className="border-2 border-slate-400 border-dotted w-full col-span-2 flex items-center justify-center">
        <FontAwesomeIcon icon={faFolder} />
        <p className="text-blue-500">Upload Resume</p>
        <input className="sr-only" type="file" />
      </label>
    </div>
  );
}
