import React, { useState } from "react";

// A custom hook to handle the modal state
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggle };
};

// A component to render the modal content
const ModalContent = ({ toggle, submitFun, content, title }) => {
  // A dummy submit function
  const handleSubmit = () => {
    submitFun();
    toggle();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg p-8 z-[1001]">
      <h1 className="text-2xl font-bold mb-4 capitalize">{title}</h1>
      <p className="text-gray-600 mb-4">{content}</p>
      <div className="grid grid-cols-2 gap-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          onClick={toggle}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// A component to render the modal overlay
const ModalOverlay = ({ toggle }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
      onClick={toggle}
    ></div>
  );
};

// A component to render the modal
export const Modal = ({ isOpen, toggle, submitFun, content, title }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[1000]">
          <ModalOverlay toggle={toggle} />
          <ModalContent
            toggle={toggle}
            submitFun={submitFun}
            content={content}
            title={title}
          />
        </div>
      )}
    </>
  );
};

// A component to render the button that triggers the modal
const ModalButton = ({ toggle }) => {
  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-md"
      onClick={toggle}
    >
      Open modal
    </button>
  );
};

// The main component that uses the custom hook and the modal components
const ModalComponent = () => {
  const { isOpen, toggle } = useModal();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ModalButton toggle={toggle} />
      <Modal isOpen={isOpen} toggle={toggle} />
    </div>
  );
};
