import axios from "axios";

import { copyImageToClipboard } from "copy-image-clipboard";

const apiEndpointInvoice = import.meta.env.VITE_API_URL + "/invoice";

const getdata = async () => {
  copyImageToClipboard(
    "https://omega-ad.b-cdn.net/fb_ads_2/OwscFhJyNrLabVKvo2vH_536151547661577.jpg"
  )
    .then(() => {
      console.log("Image Copied");
    })
    .catch((e) => {
      console.log("Error: ", e.message);
    });
  console.log("Image copied.");
};

export const createInvoice = async (invoice, itemlist, userId) => {
  try {
    const request = { data: { ...invoice, itemlist, userId } };
    const response = await axios(`${apiEndpointInvoice}/addInvoice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      ...request,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const getInvoiceUserId = async (type, userId) => {
  try {
    const response = await axios(
      `${apiEndpointInvoice}/invoiceId/${userId}/type/${type}`,
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

export const getInvoiceInvoiceId = async (invoiceId) => {
  try {
    const response = await axios(
      `${apiEndpointInvoice}/invoiceId/${invoiceId}`,
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

export const updateInvoice = async (invoiceId, userId, itemlist, invoice) => {
  try {
    const request = { data: { ...invoice, itemlist } };
    const response = await axios(
      `${apiEndpointInvoice}/userId/${userId}/invoiceId/${invoiceId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        ...request,
      }
    );
    return response.data;
  } catch (error) {}
};

export const searchInvoice = async (searchKey) => {
  try {
    // const request = { data: { searchKey } };
    const response = await axios(
      `${apiEndpointInvoice}/search-invoice/${searchKey}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // ...request,
      }
    );
    return response.data;
  } catch (error) {}
};

export const deleteInvoice = async (id) => {
  try {
    const response = await axios(`${apiEndpointInvoice}/invoice/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const createAndDownloadPdf = async (invoice) => {
  console.log(invoice);
  let totalQuantity = 0;
  invoice.itemIds.map((item) => {
    totalQuantity += Number(item.unit);
    return;
  });
  const state = {
    name: "name",
    gstin: "234587Dfggfdf45",
    invoiceNumber: invoice.invoiceNumber,
    phone: "874596123",
    date: invoice?.date,
    partyName: invoice?.party?.name,
    address: invoice?.party?.billAddress,
    placeOfSupply: invoice?.party?.placeOfSupply,
    itemlist: invoice?.itemIds,
    discount: 0,
    total: invoice?.total,
    totalQuantity,
    receivedAmount: 0,
    bankAccount: "1245789865",
    ifsc: "SBIN0010802",
  };
  axios
    .post(`${apiEndpointInvoice}/invoice-pdf`, state)
    .then(() =>
      axios.get(`${apiEndpointInvoice}/get-pdf-invoice`, {
        responseType: "blob",
      })
    )
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: "application/pdf" });
      console.log(pdfBlob);
      // saveAs(pdfBlob, `${invoice.invoiceNumber}-${invoice?.date}`);
    });
  // return res;
};
