import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/useAuthListener";
import MainLoader from "./Components/loader/mainLoader";
import Dashboard from "./pages/Dashboard";
import Authentication from "./pages/Authenticate/Authentication";
import AuthLogin from "./pages/Authenticate/AuthLogin";
import AuthSignup from "./pages/Authenticate/AuthSignup";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./Context/userContext";
import { DataProvider } from "./Context/dataContext";
import ToastBox from "./Components/Toast/ToastBox";
import { InvoiceProvider } from "./Context/invoiceContext";
import { GSTProvider } from "./Context/gstContext";
import ForgotPass from "./pages/Authenticate/ForgotPass";

// const Login = lazy(() => import('./pages/Login'));
// const SignUp = lazy(() => import('./pages/Signup'));
const Sidebar = lazy(() => import("./Components/Sidebar/Sidebar"));
const Uppernavbar = lazy(() => import("./Components/Uppernavbar"));
// const NotFound = lazy(() => import('./pages/not-found'));

export default function App() {
  const { user, jwt } = useAuthListener();

  return (
    <>
      <UserProvider user={user}>
        <DataProvider user={user}>
          <InvoiceProvider>
            <GSTProvider user={user}>
              <Router>
                <Suspense fallback={<MainLoader />}>
                  <Routes>
                    <Route
                      path={ROUTES.AUTHENTICATION}
                      element={<Authentication user={user} />}
                      children={[AuthSignup, AuthLogin, ForgotPass]}
                    />
                    <Route
                      path={`${ROUTES.HOME}*`}
                      element={<Dashboard user={user} />}
                    />

                    {/* <ProtectedRoute user={user} path={ROUTES.DASHBOARD}  >
                  <Dashboard />
                </ProtectedRoute> */}

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Router>

              <ToastBox />
              <MainLoader />
            </GSTProvider>
          </InvoiceProvider>
        </DataProvider>
      </UserProvider>
    </>
  );
}
