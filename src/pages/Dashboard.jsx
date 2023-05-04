import React, { useState, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import DetailsModal from "../Components/DetailsModal";
import Sidebar from "../Components/Sidebar/Sidebar";
// import Uppernavbar from "../Components/Uppernavbar";
import * as ROUTES from "../constants/routes";
import Item from "../Components/Item/Item";
import AddItem from "../Components/Item/AddItem";
import ImportItem from "../Components/Utilities/ImportItem";
import PurchaseInvoice from "../Components/Invoice/PurchaseInvoice/PurchaseInvoice";
import AddPurchaseInvoice from "../Components/Invoice/PurchaseInvoice/AddPurchaseInvoice";
import SalesInvoice from "../Components/Invoice/SalesInvoice/SalesInvoice";
import AddSalesInvoice from "../Components/Invoice/SalesInvoice/AddSalesInvoice";
import Expenses from "../Components/Expenses/Expenses";
import AddExpenses from "../Components/Expenses/AddExpenses";

import Parties from "../Components/Parties/Parties";
import AddParties from "../Components/Parties/AddParties";
import Setting from "../Components/Setting/Setting";
import PartyDetails from "../Components/Parties/PartyDetails";
import GstDashboard from "../Components/GST/index.jsx";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Gstr3B from "../Components/GST/Gstr3B";
import Gstr1 from "../Components/GST/Gstr1";
import MainLoader from "../Components/loader/mainLoader";
import Report from "../Components/reports/Report";

export default function Dashboard({ user: loggedInUser }) {
  const [open, setOpen] = useState(false);
  // cosnt

  if (!loggedInUser) return <Navigate to={`/authentication${ROUTES.LOGIN}`} />;

  return (
    <div className="dashboard-main">
      <Row className="h-100">
        <Col lg={2}>
          <Sidebar
            open={open}
            onClose={() => {
              setOpen(true);
            }}
          />
        </Col>
        <Col lg={10} className="h-100">
          <DetailsModal open={open} onClose={() => setOpen(false)} />
          <Suspense fallback={<MainLoader />}>
            <Routes>
              <Route path={ROUTES.ITEM} element={<Item />} />

              <Route path="/item/add" element={<AddItem />} />
              {/* <Route path="/item-table" element={<ItemTable />} />  */}
              <Route path="/purchase" element={<PurchaseInvoice />} />
              <Route path="/purchase/add" element={<AddPurchaseInvoice />} />
              <Route
                path="/invoice/purchase/open/:id"
                element={<AddPurchaseInvoice />}
              />
              <Route path="/sales" element={<SalesInvoice />} />
              <Route path="/sales/add" element={<AddSalesInvoice />} />
              <Route
                path="/invoice/sales/open/:id"
                element={<AddSalesInvoice />}
              />
              <Route path="/party/*" element={<Parties />} />
              <Route path="/party/open/:id" element={<PartyDetails />} />
              <Route path="/party/add" element={<AddParties />} />
              <Route path={ROUTES.IMPORTITEM} element={<ImportItem />} />
              <Route path="/setting/*" element={<Setting />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/addexpenses" element={<AddExpenses />} />

              <Route path={ROUTES.REPORTPAGE} element={<Report />} />

              <Route path={ROUTES.GSTDASH} element={<GstDashboard />} />
              <Route path={ROUTES.GSTGSTR3B} element={<Gstr3B />} />
              <Route path={ROUTES.GSTGSTR1} element={<Gstr1 />} />

              <Route
                path={ROUTES.DASHBOARD}
                element={<Home handleOpen={() => setOpen(true)} />}
              />
              <Route
                path="/"
                element={<Navigate to={ROUTES.DASHBOARD} />}
                replace
              />
            </Routes>
          </Suspense>
        </Col>
      </Row>

      {/* <MainLoader loading={loading} /> */}
    </div>
  );
}
