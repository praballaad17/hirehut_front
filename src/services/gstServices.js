import axios from "axios";

const apiEndpointInvoice = import.meta.env.VITE_API_URL + "/gst";

export const getSalesInvoice = async (userId, start, end) => {
  try {
    const response = await axios(
      `${apiEndpointInvoice}/sales/${userId}/${start}/${end}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const getPurchaseInvoice = async (userId) => {
  try {
    const response = await axios(`${apiEndpointInvoice}/purchase/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const getFillingDetails = async (userId, monthFinancialYear) => {
  try {
    const response = await axios(
      `${apiEndpointInvoice}/fill-detail/${userId}/${monthFinancialYear}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const postFillingDetails = async (userId, fileReport, otp, otpId) => {
  try {
    const response = await axios.post(
      `${apiEndpointInvoice}/fill-detail/${userId}`,
      {
        ...fileReport,
        otp,
        otpId,
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getGSTR1FillingDetails = async (
  userId,
  monthFinancialYear,
  start,
  end
) => {
  try {
    const response = await axios.get(
      `${apiEndpointInvoice}/fill-detail-gstr1/${userId}/${monthFinancialYear}/${start}/${end}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getGSTR3BFillingDetails = async (
  userId,
  monthFinancialYear,
  start,
  end
) => {
  try {
    const response = await axios.get(
      `${apiEndpointInvoice}/fill-detail-gstr3b/${userId}/${monthFinancialYear}/${start}/${end}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getReport = async (userId) => {
  try {
    const response = await axios.get(`${apiEndpointInvoice}/report/${userId}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
