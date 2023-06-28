import React, { useEffect, useState } from "react";
import { useMessage } from "../../Context/MessageContext";
import { processTimestamp } from "../../constants/utils";
import nomessage from "../../assets/message.jpg";

export default function MessageBox({ conversation }) {
  const { selectedConv, sendMessage, fetchMessagesContext } = useMessage();
  const [message, setMessage] = useState("");

  useEffect(() => {
    // const fetch
    fetchMessagesContext(conversation?._id);
  }, [conversation]);

  return (
    <>
      {conversation ? (
        <div className="h-full flex flex-col">
          <div className="w-100 h-16 border-b-2 flex items-center px-4">
            <div className="font-bold ">
              {conversation.sender.profileId.name}
            </div>
          </div>
          <div className="grow overflow-y-scroll">
            {selectedConv &&
              selectedConv.map((message) => (
                <div className="py-3 hover:bg-slate-100">
                  {message.sender == conversation.sender._id ? (
                    <div className=" flex">
                      <div className="mx-4">
                        <div className="h-8 w-8 rounded-full border border-gray-300"></div>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <div className="font-bold mr-3">
                            {conversation.sender.profileId.name}
                          </div>
                          <span className="text-sm text-gray-600">
                            {processTimestamp(message.timestamp)}
                          </span>
                        </div>
                        <div className="whitespace-pre-wrap">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className=" flex">
                      <div className="mx-4">
                        <div className="h-8 w-8 rounded-full border border-gray-300"></div>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <div className="font-bold mr-3">Me</div>
                          <span className="text-sm text-gray-600">
                            {processTimestamp(message.timestamp)}
                          </span>
                        </div>
                        <div className="whitespace-pre-wrap">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div>
            <div className="w-90 max-h-48 h-auto border-2 p-4 flex">
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                className="w-auto max-h-48 grow mr-2"
                placeholder="type..."
              />
              <button
                onClick={() => {
                  sendMessage(
                    message,
                    conversation._id,
                    conversation.sender._id
                  );
                  setMessage("");
                }}
                className="p-2 border rounded-lg border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              >
                send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center flex-col">
          <img className="w-44 h-44" src={nomessage} />
          <div>No Conversation Selected</div>
        </div>
      )}
    </>
  );
}
