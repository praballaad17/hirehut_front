import React from "react";

export default function Message() {
  return (
    <>
      <div className="flex h-full justify-items-center">
        <div className="w-1/4 bg-slate-100 h-full p-2">
          <h2 className="text-2xl font-bold">Messages</h2>
        </div>
        <div className="w-3/4 bg-green-300 h-full p-2"></div>
      </div>
    </>
  );
}
