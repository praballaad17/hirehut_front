import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_URL + "/party";

export const createParty = async (party, userId) => {
  try {
    const response = await axios.post(`${apiEndpoint}/addParty`, {
      party,
      userId,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getPartyByUserId = async (userId, partyType) => {
  try {
    const response = await axios.get(
      `${apiEndpoint}/getPartyByUserId/${userId}/partyType/${partyType}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getPartyTransactions = async (partyId) => {
  try {
    const response = await axios.get(
      `${apiEndpoint}/partyTransactions/${partyId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
