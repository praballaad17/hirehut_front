import React from "react";
import ReactDom from "react-dom";
import { useUser } from "../../Context/userContext";

export default function MainLoader() {
  const { loading } = useUser();

  if (!loading) return;
  return ReactDom.createPortal(
    <div className="loading-box">
      <div className="loading">
        <div></div>
        <div></div>
      </div>
    </div>,
    document.getElementById("loading")
  );
}
