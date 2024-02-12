import React, { useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import {
  fetchConversations,
  fetchMessages,
} from "../services/messagesServices";

const MessageContext = React.createContext();

export function useMessage() {
  return useContext(MessageContext);
}

export function MessageProvider({ user, children }) {
  const socket = useSocket();
  const [conversations, setConv] = useState([]);
  const [messages, setMessages] = useState({});
  const [selectedConv, setSelectedConv] = useState([]);

  useEffect(() => {
    if (socket == null) return;

    socket.on("message", ({ conversationId, message, sender }) => {
      console.log("recive message", message);
      addMessage(message, conversationId, sender, user.id);
    });
  }, [socket]);

  const sendMessage = (message, conversationId, receiver) => {
    if (socket == null) return;

    socket.emit("send-message", { message, conversationId, receiver });

    addMessage(message, conversationId, user.id, receiver);
  };

  const selectConversation = (conversationId) => {
    if (messages.hasOwnProperty(conversationId)) {
      const conversation = messages[conversationId];
      setSelectedConv(conversation);
    } else {
      fetchMessagesContext(conversationId);
    }
  };

  const fetchConversationContext = async () => {
    try {
      const res = await fetchConversations(user.id);
      setConv(res);
    } catch (error) {
      console.log(error);
    }
  };

  const addMessage = async (message, conversationId, sender, receiver) => {
    const newMessage = {
      content: message,
      conversation: conversationId,
      timestamp: new Date(),
      sender,
      receiver,
    };
    if (
      selectedConv.length &&
      selectedConv[0].conversation === conversationId
    ) {
      setSelectedConv([...selectedConv, newMessage]);
    }

    if (messages.hasOwnProperty(conversationId)) {
      let updateConv = messages[conversationId];
      updateConv = [...updateConv, newMessage];

      setMessages({
        ...messages,
        [conversationId]: updateConv,
      });
    } else {
      // await fetchMessagesContext(conversationId);
    }
  };

  const fetchMessagesContext = async (conversationId) => {
    if (!conversationId) return;
    try {
      const res = await fetchMessages(conversationId);
      console.log(res);
      if (res) {
        setMessages({
          ...messages,
          [conversationId]: res,
        });
        setSelectedConv(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    conversations,
    selectedConv,
    messages,
    sendMessage,
    fetchMessagesContext,
    fetchConversationContext,
    selectConversation,
  };
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}
