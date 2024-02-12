import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_URL + "/message";

//fetch all conversations
export const fetchConversations = async (userId) => {
  try {
    const response = await axios.get(
      `${apiEndpoint}/all-conversations/${userId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

//fetch messages of conversation
export const fetchMessages = async (conversationId) => {
  try {
    const response = await axios.get(
      `${apiEndpoint}/all-messages/${conversationId}`
    );

    if (response.status == 204) {
      return [];
    }
    return response.data;
  } catch (error) {
    return error;
  }
};
