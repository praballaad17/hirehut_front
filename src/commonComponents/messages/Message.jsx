import React, { useEffect, useState } from "react";
import { useMessage } from "../../Context/MessageContext";
import { useUser } from "../../Context/userContext";
import { fetchMessages } from "../../services/messagesServices";
import MessageBox from "./MessageBox";

export default function Message() {
  const { user } = useUser();
  const { fetchConversationContext, conversations, selectConversation } =
    useMessage();
  const [selectedConv, setSelectedConv] = useState();

  useEffect(() => {
    fetchConversationContext();
  }, []);

  const renderContent = (candidate) => {
    // let sender = {};
    if (candidate.employer._id === user.id) {
      candidate.sender = candidate.jobseeker;
    } else {
      candidate.sender = candidate.employer;
    }

    return (
      <>
        <div className="w-12 h-12 rounded-full border border-slate-400"></div>
        <div className="ml-4 font-bold grow">
          {candidate.sender.profileId.name}
        </div>
        <div className="text-slate-400 text-sm ml-4">6 days</div>
      </>
    );
  };

  const openConversation = async (conversation) => {
    try {
      setSelectedConv(conversation);
      selectConversation(conversation._id);
      const res = await fetchMessages(conversation._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex h-full justify-items-center">
        <div className="w-1/4 border border-gray-200 h-full p-2">
          <h2 className="text-2xl font-bold border border-gray-200 py-4 pl-4">
            Messages
          </h2>
          {conversations.map((item) => (
            <div
              onClick={() => openConversation(item)}
              className="px-4 py-2  flex items-center justify-between hover:bg-gray-300 cursor-pointer border-b"
            >
              {renderContent(item)}
            </div>
          ))}
        </div>
        <div className="w-3/4  h-full p-2">
          <MessageBox conversation={selectedConv} />
        </div>
      </div>
    </>
  );
}
