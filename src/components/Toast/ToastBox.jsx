import React, { useState } from "react";
import { useUser } from "../../Context/userContext";
import ToastItem from "./Toast";

export default function ToastBox({ content, error = false }) {
  const { toastList } = useUser();

  return (
    <div className="fixed top-0 right-0 m-8 z-[2001]">
      {toastList && toastList.length ? (
        toastList.map((toast, idx) => (
          <ToastItem key={idx} toast={toast} idx={idx} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
